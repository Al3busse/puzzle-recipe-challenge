import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { AuthenticationError } from "apollo-server-express";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const validatePassword = async (
  inputPassword: string,
  dbPassword: string
) => {
  const validPassword = await bcrypt.compare(inputPassword, dbPassword);
  return validPassword;
};

export const getToken = (userId: number) => {
  return jwt.sign({ _userId: userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const authUser = async (tokenBearer: string) => {
  if (!tokenBearer) throw new AuthenticationError("You must log in first");

  const token = tokenBearer.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("No token provided");

  const user = jwt.verify(token, process.env.JWT_SECRET!, (err: any) => {
    if (err) throw new AuthenticationError("Invalid Token");
  });
  return user;
};

export const decodeToken = async (tokenBearer: string) => {
  const token = tokenBearer.split("Bearer ")[1];
  const tokenAndSecret = "" + process.env.JWT_SECRET! + "///" + token + "";
  const decoded: {
    _userId: number;
    iat: number;
    exp: number;
  } = await jwt_decode(tokenAndSecret);

  return decoded._userId;
};
