import { request } from "../utils/constants";
import { IUser } from "../utils/interfaces";

export const login = async (username: string, password: string) => {
  const resp = await request.post("/user/login", {
    username,
    password,
  });
  return resp.data;
};

export const updateProfile = async (id: string, user: IUser) => {
  const resp = await request.put(`/user/${id}`, user);
  return resp.data;
};
