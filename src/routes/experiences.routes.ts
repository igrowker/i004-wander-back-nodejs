import express from "express";
const router = express.Router();
import { getExperienceById, getExperiences, uploadExperience, updateExperience, 
    getExperiencesByHost, getExperiencesByTag, getLatestExperiences, getMostBookedExperiences,
    getTags, getTopRatedExperiences } from "../controllers/experiences.controllers";
import { isAuthenticated } from "../middlewares/verifyToken.middleware";

router.get('/get-all', getExperiences);
router.get('/:id', getExperienceById);
router.get('/host/:id', getExperiencesByHost);
router.get('/top-rated', getTopRatedExperiences);
router.get('/most-reserved', getMostBookedExperiences);
router.get('/latest', getLatestExperiences);
router.get('/tags', getTags);
router.get('/tags/:tag', getExperiencesByTag);
router.post('/create', isAuthenticated, uploadExperience);
router.put('/:id', isAuthenticated, updateExperience);

export default router;