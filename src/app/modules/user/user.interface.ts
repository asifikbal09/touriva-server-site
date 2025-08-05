import { Model } from "mongoose"
import { USER_ROLE } from "./user.constant"

export interface IUser {
    name: string
    email: string
    password: string
    phone: string
    address: string
    role: 'admin'| 'user'|'tourGuide'
}
export type TUserRole = keyof typeof USER_ROLE;
export interface UserModel extends Model<IUser> {
    isPasswordMatched(
      planeTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
  }