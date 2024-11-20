import express from "express";
const router = express.Router();
import { getBookingsById } from "../controllers/bookings.controllers";

router.get('/:id', getBookingsById);

export default router;