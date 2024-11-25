import express from "express";
const router = express.Router();
import { getBookingsById } from "../controllers/bookings.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/:id', isAuthenticated, getBookingsById);

export default router;