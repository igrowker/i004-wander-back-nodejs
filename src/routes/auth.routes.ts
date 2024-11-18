import express from "express";
const router = express.Router();
import { login, verify, logout, register } from "../controllers/auth.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";


router.post("/login", login);
router.get("/verify", isAuthenticated, verify);
router.post("/logout", logout);
router.post("/register", register);

export default router;
