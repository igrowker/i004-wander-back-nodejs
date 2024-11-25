import express from "express";
const router = express.Router();
import { getExperienceById, getExperiences, uploadExperience, updateExperience } from "../controllers/experiences.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/get-all', getExperiences);
router.get('/:id', getExperienceById);
router.post('/', isAuthenticated, uploadExperience)
router.put('/:id', isAuthenticated, updateExperience)

export default router;