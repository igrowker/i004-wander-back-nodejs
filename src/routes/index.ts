import express, { Router } from 'express'
import exampleRoutes from './example'
/*
// example: (delete comment when adding the 1st route)
import authRoutes from './auth.routes'
*/

const router: Router = express.Router()

/*
// example:
router.use("/auth", authRoutes)
*/
router.use("/example", exampleRoutes)

export default router