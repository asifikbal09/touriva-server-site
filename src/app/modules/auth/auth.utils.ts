import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import type ms from 'ms'

export const createToken = (
    jwtPayload: { _id: string; role: string; email: string },
    secret: string,
    expiresIn: ms.StringValue,
  ) => {
    const signOptions: SignOptions ={
        expiresIn:expiresIn
    }
    return jwt.sign(jwtPayload, secret,signOptions);
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  };