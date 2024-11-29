import { Response, Request, NextFunction } from "express";
import axios from "axios";
import * as yup from "yup";
import { userRegistrationSchema, updateProfileSchema, userVerification } from "../types/yup-validations";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(404)
            .json({ message: "Email and password are required." });
    }

    //Add email format validation (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    try {
        //Send request to the backend to retrieve the jwt and user info
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/login`, {
            email,
            password,
        });

        //If successful, store the response
        const { token, idUser } = response.data;

        // Store userId in the request payload
        req.payload = { idUser };

        //Send the token and and user details
        return res.json({
            message: "Log in successful",
            token,
            idUser
        });

    } catch (error: any) {
        console.error("Error logging in.", error);

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return res.status(400).json({ message: "Missing email or password" })
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

const logout = async (req: Request, res: Response) => {

    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/logout`, null);
        
        // Optionally check the response from the backend
        if (response.status === 200) {
            return res.status(200).json({ message: "Sesión cerrada exitosamente" });
        } else {
            return res.status(response.status).json({ message: "Error during logout" });
        }

    } catch (error) {
        console.error("Error durante el logout:", error);
        
        // More specific error handling
        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({ error: "Hubo un problema al cerrar la sesión" });
        }

        return res.status(500).json({ error: "Hubo un problema al cerrar la sesión" });
    }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    // Access userId from the request payload
    const idUser = req.payload.userId; // Assuming userId is stored in the payload after authentication

    try {
        // Send a request to the backend to retrieve the user's profile using userId
        const response = await axios.get(`${JAVA_BACKEND_URL}/api/users/profile/${idUser}`);

        // Extract the user profile data from the response
        const profile = response.data;

        return res.status(200).json({
            message: "Retrieved user data successfully.",
            profile
        });

    } catch (error: any) {
        console.error("Error retrieving profile:", error);

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return res.status(401).json({ message: "Unauthorized access" });
                case 404:
                    return res.status(404).json({ message: "Profile not found" });
                default:
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    
    const validData = await updateProfileSchema.validate(req.body, {
        abortEarly: false,
    });

    if (Object.keys(validData).length === 0) {
        return res.status(400).json({ message: "No data provided to update" });
    }

    try {
        const userId = req.payload.idUser; // Access userId from the request payload

        // Send the updated data to the backend, including userId
        const response = await axios.put(`${JAVA_BACKEND_URL}/api/users/profile/${userId}`, validData);

        // If successful, return the updated profile data
        const updatedProfile = response.data;

        return res.status(200).json({
            message: "Profile updated successfully",
            updatedProfile,
        });

    } catch (error: any) {
        console.error("Error updating profile:", error);

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return res.status(400).json({ message: "Invalid data provided" });
                case 401:
                    return res.status(401).json({ message: "Unauthorized access" });
                case 404:
                    return res.status(404).json({ message: "User not found" });
                default:
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

const register = async (req: Request, res: Response) => {

    try {
        // Validación de los datos enviados por el frontend
        const validData = await userRegistrationSchema.validate(req.body, {
            abortEarly: false,
        })
        
        const backendResponse = await axios.post(
            `${JAVA_BACKEND_URL}/api/autenticacion/register`,
            validData
        );
        
        const newUser = backendResponse.data
        // Devolver la respuesta del backend al frontend
        return res.status(200).json({
            message: "User registered successfully",
            newUser
        });
        
    } catch (error: any) {
        
        if (error instanceof yup.ValidationError) {
            // Errores de validación
            return res.status(400).json({ errors: error.errors });
        }
        
        if (axios.isAxiosError(error)) {
            // Errores en la comunicación con el backend principal
            return res.status(error.response?.status || 500).json({
                message: "Error communicating with the main backend",
                details: error.response?.data || error.message,
            });
        }
        
        // Otros errores
        return res.status(500).json({
            message: "Internal server error",
            details: (error as Error).message, 
        });
    }
};

const verificationCode = async (req: Request, res: Response) => {

    try {

        const validData = await userVerification.validate(req.body, {
            abortEarly: false
        })
        
        // Send a request to the backend to verify the user
        const response = await axios.post(
            `${JAVA_BACKEND_URL}/api/autenticacion/verify-user`,
            validData // Assuming you want to send the request body
        );

        // Return the response from the backend
        return res.status(200).json({
            message: "Verification successful",
            data: response.data,
        });
        
    } catch (error: any) {
        console.error("Error verifying user:", error);

        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({
                message: "Error communicating with the verification service",
                details: error.response.data,
            });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

const verify = (req: Request, res: Response, next: NextFunction) => {

    if (req.authError && req.authError.name === "Unauthorized") {
        return res.status(401).json({ message: "JWT expired" });
    }

    return res.status(200).json(req.payload);
};

export { register, login, verify, logout, getProfile, updateProfile, verificationCode };
