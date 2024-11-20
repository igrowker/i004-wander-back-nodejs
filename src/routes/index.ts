import express, { Router } from 'express'
import authRoutes from './auth.routes'
import { recoverPassword } from '../controllers/passRecovery.controllers'
import experienceRoutes from './experiences.routes'

const router: Router = express.Router()

router.use("/auth", authRoutes)
router.use("/recoverPassword", recoverPassword)
router.use("/experiences", experienceRoutes)

export default router