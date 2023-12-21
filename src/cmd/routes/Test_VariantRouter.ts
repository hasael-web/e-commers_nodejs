import { Router } from "express";
import Test_VariantControllers from "../controllers/Test_VariantControllers";
import fileUpload from "../config/file-upload";

const router = Router();

router.post(
  "/variant_test",
  fileUpload.uploadFile("image_src"),
  Test_VariantControllers.testVariant
);

export default router;
