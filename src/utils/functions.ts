import jwt_decode from "jwt-decode";
import { IUser } from "./interfaces";

export const getUserByToken = (): IUser => {
  const token = localStorage.getItem("token");
  const user = jwt_decode(token || "") as IUser;
  return user;
};
