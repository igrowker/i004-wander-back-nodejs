import express from "express";
const router = express.Router();
import { recoverPassword, createNewPassword } from "../controllers/passRecovery.controllers";

router.post("/forgot-password", recoverPassword)
router.post('/reset-password', createNewPassword)

export default router;