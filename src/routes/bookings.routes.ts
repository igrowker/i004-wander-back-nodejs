import express from "express";
const router = express.Router();
import { getBookingsById, makeBookings } from "../controllers/bookings.controllers";

router.get('/:id', getBookingsById);
router.post('/create', makeBookings);

export default router;