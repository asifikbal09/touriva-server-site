import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IUser } from './user.interface';
import { User } from './user.model';

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found.');
  }
  return result;
};

const updateUserInfoFromDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  }).select('-password');

  return result;
};

export const UserServices = {
  getSingleUserFromDB,
  updateUserInfoFromDB,
};