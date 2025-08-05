import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user','tourGuide'],
      default:"user"
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const password = this.password;
  const hashedPassword = await bcrypt.hash(password, Number(config.saltRound));
  this.password = hashedPassword;

  next();
});

userSchema.statics.isPasswordMatched = async function (
  planeTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);