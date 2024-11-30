import express from "express"
const router = express.Router()
import { getPresignedUrl, uploadImage } from "../controllers/imageUpload.controllers"
import { isAuthenticated } from "../middlewares/verifyToken.middleware"

router.post("/presigned-url", getPresignedUrl)
router.post("/image", uploadImage)

export default router