import express from "express";
const router = express.Router();
import { signup, login, verify, logout, getProfile, updateProfile } from "../controllers/auth.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getProfile)
router.put("/profile", updateProfile)
router.get("/verify", isAuthenticated, verify);

export default router;
