import express from "express";
const router = express.Router();
import { getExperienceById, getExperiences, uploadExperience, updateExperience } from "../controllers/experiences.controllers";

router.get('/get-all', getExperiences);
router.get('/:id', getExperienceById);
router.post('/', uploadExperience)
router.put('/:id', updateExperience)

export default router;