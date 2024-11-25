import { Response, NextFunction, Request } from 'express'
import axios from 'axios';

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

interface CustomRequest extends Request {
    payload?: any; // Adjust the type as necessary
}

const recoverPassword = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body;

    if (!email) {
        return res.status(404).json({message: "Email and password are required."})
    }

    //Add email format validation (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    try {
        //Send request to the backend to create a recovery code sent to email
        const response = await axios.post(`${JAVA_BACKEND_URL}/recover_password`, {
            email,
        });

        return res.json({
            message: "Password recovery request sent successfully.",
            result: response.data
        })
    } catch (error: any) {
        console.log("Error requesting password recovery.", error)

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

export { recoverPassword }