import { Response, NextFunction, Request } from "express";
import axios from "axios";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

interface CustomRequest extends Request {
  payload?: any; // Adjust the type as necessary
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    try {
        // connection with Java DB
        res.sendStatus(201);

    } catch (err) {

    }
};

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

        //Send request to the backend to retrieve the jwt
        const response = await axios.post(`${JAVA_BACKEND_URL}/users/login`, {
            email,
            password,
        });

        //If successful, store the response
        const { token } = response.data;

        //Send the token and and user details
        res.json({
            message: "Log in successful",
            token,
        });

    } catch (error: any) {
        console.error("Error logging in.", error);

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

const logout = async (req: Request, res: Response) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        await axios.post(`${JAVA_BACKEND_URL}/users/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).json({ message: "Sesión cerrada exitosamente" });

    } catch (error) {
        console.error("Error durante el logout:", error);
        res.status(500).json({ error: "Hubo un problema al cerrar la sesión" });
    }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split("")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Send a request to the backend to retrieve the user's profile
        const response = await axios.get(`${JAVA_BACKEND_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Extract the user profile data from the response
        const profile = response.data
        res.status(200).json(profile)

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

        res.status(500).json({ message: "Internal server error" });
    }

}

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split("")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const newData = req.body

    if (Object.keys(newData).length === 0) {
        return res.status(400).json({ message: "No data provided to update" });
    }

    try {
        // Send the updated data to the backend
        const response = await axios.put(`${JAVA_BACKEND_URL}/users/profile`, newData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // If successful, return the updated profile data
        const updatedProfile = response.data;

        res.status(200).json({
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

        res.status(500).json({ message: "Internal server error" });
    }
}
                       
const verify = (req: CustomRequest, res: Response, next: NextFunction) => {

    if (req.authError && req.authError.name === "Unauthorized") {
        return res.status(401).json({ message: "JWT expired" });
    }

    res.status(200).json(req.payload);
};

export { signup, login, verify, logout, getProfile, updateProfile };