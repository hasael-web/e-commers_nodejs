import * as express from "express";
import fileUpload from "../config/file-upload";
import ReviewController from "../controllers/ReviewController";
import auth from "../middlewares/auth";
import userAuth from "../middlewares/userAuth";

const router = express.Router();

router.post("/review", auth.auth, ReviewController.create);
router.get("/review/:id_review", ReviewController.getOne);
router.delete("/review", auth.auth, ReviewController.deleteReview);
router.patch("/review/:id_review", ReviewController.updateReview);

export default router;
