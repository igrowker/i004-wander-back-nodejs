import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/verifyToken.middleware";
import { register, login, verify, logout, updateProfile, verificationCode, getProfile, resendVerificationCode } from "../controllers/auth.controllers";

router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/verify-user", verificationCode);
router.post("/register", register);
router.post("/resend-code", resendVerificationCode);
router.get("/verify", isAuthenticated, verify);

export default router;