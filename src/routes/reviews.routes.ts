import express from "express";
const router = express.Router();
import { uploadReview } from "../controllers/reviews.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/upload-review', isAuthenticated, uploadReview);

export default router;