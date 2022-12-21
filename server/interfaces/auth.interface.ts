import { Request } from "express";
import { UserI } from "./user.interface";

export interface JwtI {
  id: string;
  iat: number;
  exp: number;
}

export interface RequestWithUser extends Request {
  user?: UserI | any;
}
