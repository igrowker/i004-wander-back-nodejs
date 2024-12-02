import express from "express";
const router = express.Router();
import { recoverPassword, verifyPasswordRecovery, createNewPassword } from "../controllers/passRecovery.controllers";

router.post("/recover-password", recoverPassword)
router.post('/verify-recovery', verifyPasswordRecovery)
router.post('/create-new', createNewPassword)

export default router;