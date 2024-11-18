import { expressjwt } from "express-jwt"
import { Response, NextFunction, Request } from "express"

declare global {
    namespace Express {
        interface Request {
            payload?: any
            authError?: { name: string; message: string };
        }
    }
}

const isAuthenticated = expressjwt({

    secret: process.env.TOKEN_SECRET || 'your-secret-key',
    algorithms: ["HS256"],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders

})

function getTokenFromHeaders(req: Request) {

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {

        const token = req.headers.authorization.split(" ")[1]
        return token
    }

    return undefined
}

const jwtErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err.name === 'Unauthorized') {
        req.authError = { name: err.name, message: err.message };
        res.status(401).json({ message: 'JWT expired' })
    } else {
        next(err)
    }
}

export { isAuthenticated, jwtErrorHandler }