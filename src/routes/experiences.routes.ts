import express from "express";
const router = express.Router();
import { getExperienceById, getExperiences, uploadExperience, updateExperience } from "../controllers/experiences.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/get-all', getExperiences);
router.get('/:id', getExperienceById);
router.post('/create', uploadExperience)
router.put('/:id', updateExperience)

export default router;