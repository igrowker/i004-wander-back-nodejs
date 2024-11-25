import express, { Router } from 'express'
import authRoutes from './auth.routes'
import experienceRoutes from './experiences.routes'
import bookingsRoutes from './bookings.routes'
import uploadRoutes from './upload.routes'
import reviewRoutes from './reviews.routes'
import { recoverPassword } from '../controllers/passRecovery.controllers'

const router: Router = express.Router()

router.use("/auth", authRoutes)
router.use("/experiences", experienceRoutes)
router.use("/bookings", bookingsRoutes)
router.use("/reviews", reviewRoutes)

router.use("/upload", uploadRoutes)
router.use("/recoverPassword", recoverPassword)

export default router