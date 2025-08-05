import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getSingleUser = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserServices.getSingleUserFromDB(user._id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserServices.updateUserInfoFromDB(user._id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  updateUserInfo,
};