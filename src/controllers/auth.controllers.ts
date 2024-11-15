import { Response, NextFunction } from 'express'
import { Request } from '@/types/express-custom'

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body

    try {
        // connection with Java DB
        res.sendStatus(201)

    } catch (err) {
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {

    //Charlie
}

const verify = (req: Request, res: Response, next: NextFunction) => {

    if (req.authError && req.authError.name === 'Unauthorized') {
        return res.status(401).json({ message: 'JWT expired' })
    }

    res.status(200).json(req.payload)
}

export { signup, login, verify }