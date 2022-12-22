export interface UserI {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthStateI {
  user: UserI | {};
  status: "idle" | "loading" | "failed" | "success";
  message: string;
}

export interface RegisterI {
  name: string;
  email: string;
  password: string;
}

export interface LoginI {
  email: string;
  password: string;
}
