import express from "express";
const router = express.Router();
import { signup, login, verify, logout, register } from "../controllers/auth.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";


router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", isAuthenticated, verify);
router.post("/logout", logout);
router.post("/signup", register);

export default router;
