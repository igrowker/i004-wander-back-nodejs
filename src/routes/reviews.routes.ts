import express from "express";
const router = express.Router();
import { uploadReview, deleteReview, updateReview, getReviewsByExperienceId } from "../controllers/reviews.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.post('/create', isAuthenticated, uploadReview);
router.delete('/:id', isAuthenticated, deleteReview);
router.put('/update', isAuthenticated, updateReview);
router.get('/experience/:experienceId', getReviewsByExperienceId);

export default router;