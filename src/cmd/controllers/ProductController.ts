import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { TUser } from "../../utils/Types/UserType";

interface RequestJWT extends Request {
  user: TUser;
}

export default new (class ProductController {
  create(req: RequestJWT, res: Response) {
    ProductService.create(req, res);
  }
  findAll(req: Request, res: Response) {
    ProductService.findAll(req, res);
  }
  findOne(req: Request, res: Response) {
    ProductService.findOne(req, res);
  }
  deleteProduct(req: RequestJWT, res: Response) {
    ProductService.deleteProduct(req, res);
  }
  updateProduct(req: RequestJWT, res: Response) {
    ProductService.updateProduct(req, res);
  }
})();
