import { Router } from "express";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/user-update", auth.auth, UserController.update);
router.delete("/user-delete", auth.auth, UserController.delete);

export default router;
