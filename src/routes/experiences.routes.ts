import express from "express";
const router = express.Router();
import { getExperienceById, getExperiences } from "../controllers/experiences.controllers";


router.get('/get-all', getExperiences);
router.get('/:id', getExperienceById);


export default router;