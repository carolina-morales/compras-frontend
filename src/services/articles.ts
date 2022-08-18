import { request } from "../utils/constants";
import { CreateArticle, IArticle } from "../utils/interfaces";

export const getArticles = async (params: Partial<IArticle>) => {
  const resp = await request.get("/article", { params });
  return resp.data;
};

export const saveArticle = async (article: CreateArticle) => {
  const resp = await request.post("/article", article);
  return resp.data;
};

export const removeArticle = async (id: string) => {
  const resp = await request.delete(`/article/${id}`);
  return resp.data;
};
