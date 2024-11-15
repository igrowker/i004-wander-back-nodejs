import { Response, NextFunction, Request } from 'express'
import axios from 'axios';

interface CustomRequest extends Request {
    payload?: any; // Adjust the type as necessary
}

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

    const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({message: "Email and password are required."})
    }

    //Maybe add email format validation (regex)

    try {
        //Send request to the backend to retrieve the jwt
        const response = await axios.post(`${JAVA_BACKEND_URL}/users/login`, {
            email,
            password
        });
        //If successful, store the response
        const { token } = response.data

        //Send the token and and user details
        res.json({
            message: "Log in successful",
            token
        })
    } catch (error: any) {
        console.log("Error logging in.", error);

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    return res.status(404).json({ message: "User not found" });
                case 401:
                    return res.status(401).json({ message: "Invalid credentials" });
                default:
                    return res.status(500).json({ message: "Internal server error." });
            }
        }
    }
};


const verify = (req: CustomRequest, res: Response, next: NextFunction) => {

    if (req.authError && req.authError.name === 'Unauthorized') {
        return res.status(401).json({ message: 'JWT expired' })
    }

    res.status(200).json(req.payload)
}

export { signup, login, verify }