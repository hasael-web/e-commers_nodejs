import { TUser } from "../UserType";
import { Request } from "express";

export interface RequestAuth extends Request {
  user: TUser;
}
