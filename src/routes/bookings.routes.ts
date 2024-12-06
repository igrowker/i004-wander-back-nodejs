import express from "express";
const router = express.Router();
import { getBookingsById, makeBookings, updateBooking, getBookingsByUser, getBookingsByExperience } from "../controllers/bookings.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/:id', isAuthenticated, getBookingsById);
router.post('/create', isAuthenticated, makeBookings);
router.put('/:id', isAuthenticated, updateBooking);
router.get('/user/:userId', isAuthenticated, getBookingsByUser);
router.get('/experience/:experienceId', isAuthenticated, getBookingsByExperience);

export default router;