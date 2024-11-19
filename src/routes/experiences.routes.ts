import express from "express";
const router = express.Router();
import { getExperiences } from "../controllers/experiences.controllers";


router.get('/experiences', getExperiences);


export default router;