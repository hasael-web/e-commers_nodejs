import { Router } from "express";
import OrderController from "../controllers/OrderController";
import auth from "../middlewares/auth";
import userAuth from "../middlewares/userAuth";

const router = Router();

router.get("/order-customer", auth.auth, OrderController.findByCustomer);
router.get(
  "/order-supplier",
  auth.auth,
  userAuth.roleAuth("supplier"),
  OrderController.findBySupplier
);
router.post("/order", auth.auth, OrderController.create);
router.post("/transaction", auth.auth, OrderController.transaction);

export default router;
