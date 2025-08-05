import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';


const createUserIntoDB = async (payload: IUser) => {
  const newUser = await User.create(payload);
  const result = await User.findById(newUser._id).select('-password');
  return result;
};

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User ');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password not match.');
  }
  const jwtPayload = {
    _id: user._id.toString(),
    role: user.role,
    email: user.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in,
  );
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
    accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUserFromDB,
};