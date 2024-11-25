import { Response, NextFunction, Request } from "express";
import axios from "axios";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const uploadReview = async (req: Request, res: Response) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const { experienceId, rating, comment, date } = req.body

    if (!experienceId || !rating || !comment || !date) {
        return res.status(400).json({ message: 'All fields are required. Please provide experienceId, rating, comment and date.' });
    }

    try{
        const response = await axios.post(`${JAVA_BACKEND_URL}/reviews`, {
            experienceId, rating, comment, date
        });

        const { review } = response.data

        return res.json({
            message: "Review uploaded successfully.",
            review
        });

    } catch (error: any) {
        console.error("Error uploading review.", error);

        if (error.response) {
          switch (error.response.status) {
            case 400:
              return res.status(400).json({ message: "Invalid input. Please check your data and try again." });
            case 404:
              return res.status(404).json({ message: "User not found. Please ensure the user exists." });
            case 401:
              return res.status(401).json({ message: "Unauthorized. Please check your credentials." });
            default:
              return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
            }
        }
    }
};

export { uploadReview }