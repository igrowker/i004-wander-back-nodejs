import express from "express";
const router = express.Router();
import { uploadReview, deleteReview, updateReview } from "../controllers/reviews.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.post('/create', uploadReview);
router.delete('/:id', deleteReview);
router.put('/update', updateReview);

export default router;