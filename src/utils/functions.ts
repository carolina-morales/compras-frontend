import jwt_decode from "jwt-decode";
import { IUser } from "./interfaces";

export const getUserByToken = (): { user: IUser; exp: number; iat: number } => {
  const token = localStorage.getItem("token");
  const user = jwt_decode(token || "") as {
    user: IUser;
    exp: number;
    iat: number;
  };
  return user;
};
