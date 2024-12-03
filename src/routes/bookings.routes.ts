import express from "express";
const router = express.Router();
import { getBookingsById, makeBookings, updateBooking } from "../controllers/bookings.controllers";

router.get('/:id', getBookingsById);
router.post('/create', makeBookings);
router.put('/:id', updateBooking);

export default router;