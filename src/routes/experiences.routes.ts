import express from "express";
const router = express.Router();
import { getExperiences } from "../controllers/experiences.controllers";

router.get('/get-all', getExperiences);

export default router;