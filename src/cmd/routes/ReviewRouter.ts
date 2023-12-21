import * as express from "express";
import fileUpload from "../config/file-upload";
import ReviewController from "../controllers/ReviewController";

const router = express.Router();

router.post("/review", ReviewController.create);
router.get("/review/:id_review", ReviewController.getOne);
router.delete("/review", ReviewController.deleteReview);
router.patch("/review/:id_review", ReviewController.updateReview);

export default router;
