import { Request, Response } from "express";

import OrderService from "../services/OrderService";
import { RequestAuth } from "../../utils/Types/AuthUserType/RequestType";

export default new (class OrderController {
  create(req: RequestAuth, res: Response) {
    OrderService.create(req, res);
  }
  findByCustomer(req: RequestAuth, res: Response) {
    OrderService.findByCustomer(req, res);
  }
  findBySupplier(req: RequestAuth, res: Response) {
    OrderService.findBySupplier(req, res);
  }

  transaction(req: RequestAuth, res: Response) {
    OrderService.userTransaction(req, res);
  }
})();
