import express, { Router } from 'express'
import authRoutes from './auth.routes'
import { recoverPassword } from '../controllers/passRecovery.controllers'
import experienceRoutes from './experiences.routes'
import bookingsRoutes from './bookings.routes'

const router: Router = express.Router()

router.use("/auth", authRoutes)
router.use("/recoverPassword", recoverPassword)
router.use("/experiences", experienceRoutes)
router.use("/bookings", bookingsRoutes)

export default router