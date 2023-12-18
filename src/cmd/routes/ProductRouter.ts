import * as express from "express";
import ProductController from "../controllers/ProductController";
import fileUpload from "../config/file-upload";

const router = express.Router();

router.post(
  "/product",
  fileUpload.uploadFile("image_src"),
  ProductController.create
);
router.get("/products", ProductController.findAll);
router.get("/product/:id_product", ProductController.findOne);
router.delete("/product/:id_product", ProductController.deleteProduct);
router.patch(
  "/product/:id_product",
  fileUpload.uploadFile("image_src"),
  ProductController.updateProduct
);

export default router;
