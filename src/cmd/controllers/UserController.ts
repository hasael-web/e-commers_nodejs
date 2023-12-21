import { Request, Response } from "express";
import UserService from "../services/UserService";

export default new (class UserController {
  async register(req: Request, res: Response) {
    UserService.register(req, res);
  }
  async login(req: Request, res: Response) {
    UserService.login(req, res);
  }
  async update(req: Request, res: Response) {
    UserService.update(req, res);
  }
  async delete(req: Request, res: Response) {
    UserService.delete(req, res);
  }
})();
