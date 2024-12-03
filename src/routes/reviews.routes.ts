import express from "express";
const router = express.Router();
import { uploadReview, deleteReview, updateReview, getReviewsByExperienceId } from "../controllers/reviews.controllers";

router.post('/create', uploadReview);
router.delete('/:id', deleteReview);
router.put('/update', updateReview);
router.get('/experience/:experienceId', getReviewsByExperienceId);

export default router;