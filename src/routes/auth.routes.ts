import express from "express";
const router = express.Router();
import { signup, login, verify, logout } from "../controllers/auth.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", isAuthenticated, verify);
router.get("/logout", logout);

export default router;
