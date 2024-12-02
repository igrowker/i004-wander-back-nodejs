import { Response, NextFunction, Request } from 'express'
import axios from 'axios';
import { passwordChangeSchema } from '../types/yup-validations';

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const recoverPassword = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body;

    if (!email) {
        return res.status(404).json({message: "Email and is required."})
    }

    //Add email format validation (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    try {
        //Send request to the backend to create a recovery code sent to email
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/recover_password`, {
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

const verifyPasswordRecovery = async (req: Request, res: Response) => {

    const { verificationCode } = req.body;
    if(!verificationCode) {
        return res.status(404).json({message: "Verification code required."})
    }

    const codeRegex = /^\d{6}$/;
    if(!codeRegex.test(verificationCode)) {
        return res.status(400).json({ message: "Invalid code format." });
    }

    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/recover_password_verification`, {
            verificationCode
        });

        return res.json({
            message: "Verification successful."
        });
    } catch (error: any) {
        console.log("Error verifying code.", error)

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

const createNewPassword = async (req: Request, res: Response) => {

    const validPassword = await passwordChangeSchema.validate(req.body, {
        abortEarly: false
    });

    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/password-change`, validPassword);
    
        if (response.status === 200) {
            return res.status(200).json({ message: "New password set successfully" });
        } else {
            return res.status(response.status).json({ message: "Error password change" });
        }
    } catch (error: any) {
        console.error("Error creating new password:", error.message || error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors
            });
        }
    }
};

export { recoverPassword, verifyPasswordRecovery, createNewPassword }