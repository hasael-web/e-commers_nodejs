import { Router, Response, Request } from "express";
import ProductController from "../controllers/ProductController";
import fileUpload from "../config/file-upload";
import auth from "../middlewares/auth";
import userAuth from "../middlewares/userAuth";
import { TUser } from "../../utils/Types/UserType";

const router = Router();

interface RequestJWT extends Request {
  user: TUser;
}

router.post(
  "/product",
  auth.auth,
  userAuth.roleAuth("supplier"),
  fileUpload.uploadFile("image_src"),
  ProductController.create
);
router.get("/products", ProductController.findAll);
router.get("/product/:id_product", ProductController.findOne);
router.delete(
  "/product/:id_product",
  auth.auth,
  userAuth.roleAuth("supplier"),
  ProductController.deleteProduct
);
router.patch(
  "/product/:id_product",
  auth.auth,
  userAuth.roleAuth("supplier"),
  fileUpload.uploadFile("image_src"),
  ProductController.updateProduct
);

export default router;
