import jwt_decode from "jwt-decode";
import { IUser } from "./interfaces";

export const getUserByToken = (): any => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const user = jwt_decode(token || "") as {
    user: IUser;
    exp: number;
    iat: number;
  };
  return user;
};
