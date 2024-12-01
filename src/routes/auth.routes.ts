import express from "express";
const router = express.Router();
import { register, login, verify, logout, updateProfile, verificationCode } from "../controllers/auth.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.post("/login", login);
router.post("/logout", logout);
//router.get("/profile", getProfile)
router.put("/profile", updateProfile)
router.get("/verify", verify);
router.post("/verify-user", verificationCode)
router.post("/register", register);

export default router;