import { Request, Response } from "express";
import ProductService from "../services/ProductService";

export default new (class ProductController {
  create(req: Request, res: Response) {
    ProductService.create(req, res);
  }
  findAll(req: Request, res: Response) {
    ProductService.findAll(req, res);
  }
  findOne(req: Request, res: Response) {
    ProductService.findOne(req, res);
  }
  deleteProduct(req: Request, res: Response) {
    ProductService.deleteProduct(req, res);
  }
  updateProduct(req: Request, res: Response) {
    ProductService.updateProduct(req, res);
  }
})();
