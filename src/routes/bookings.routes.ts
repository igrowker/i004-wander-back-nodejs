import express from "express";
const router = express.Router();
import { getBookingsById, makeBookings, updateBooking, getBookingsByUser } from "../controllers/bookings.controllers";

router.get('/:id', getBookingsById);
router.post('/create', makeBookings);
router.put('/:id', updateBooking);
router.get('/user/:userId', getBookingsByUser);

export default router;