import { Router } from "express";
import { forgotPassword, getMe, login, logout, signup } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.get("/me", protect, getMe);

export default router;
