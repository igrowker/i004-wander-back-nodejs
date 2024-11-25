import express from "express";
const router = express.Router();
import { getBookingsById, makeBookings } from "../controllers/bookings.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/:id', isAuthenticated, getBookingsById);
router.post('/create', isAuthenticated, makeBookings);

export default router;