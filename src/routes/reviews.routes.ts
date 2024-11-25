import express from "express";
const router = express.Router();
import { uploadReview } from "../controllers/reviews.controllers";

router.get('/upload-review', uploadReview);

export default router;