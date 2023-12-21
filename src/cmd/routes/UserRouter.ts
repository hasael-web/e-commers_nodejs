import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/user-update", UserController.update);
router.delete("/user-delete", UserController.delete);

export default router;
