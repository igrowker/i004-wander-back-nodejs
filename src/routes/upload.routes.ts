import express from "express"
const router = express.Router()
import { getPresignedUrl, uploadImage, deleteImage } from "../controllers/imageUpload.controllers"

router.post("/presigned-url", getPresignedUrl)
router.post("/image", uploadImage)
router.delete("/image", deleteImage)

export default router