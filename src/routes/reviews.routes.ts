import express from "express";
const router = express.Router();
import { uploadReview, deleteReview } from "../controllers/reviews.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.post('/', isAuthenticated, uploadReview);
router.delete('/:id', isAuthenticated, deleteReview)

export default router;