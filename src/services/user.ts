import { request } from "../utils/constants";

export const login = async (username: string, password: string) => {
  const resp = await request.post("/user/login", {
    username,
    password,
  });
  return resp.data;
};
