import express, { Router } from 'express'
import authRoutes from './auth.routes'
import { recoverPassword } from '../controllers/passRecovery.controllers'

const router: Router = express.Router()

router.use("/auth", authRoutes)
router.use("/recoverPassword", recoverPassword)

export default router