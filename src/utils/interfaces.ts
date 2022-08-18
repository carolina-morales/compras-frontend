export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  photo: string;
}

export interface IArticle {
  _id: string;
  name: string;
  user: string;
}

export interface CreateArticle {
  name: string;
  user: string;
}
