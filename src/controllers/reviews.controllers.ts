import { Response, Request, NextFunction } from "express";
import axios from "axios";
import { uploadReviewSchema } from "../types/yup-validations";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const uploadReview = async (req: Request, res: Response) => {

  const validData = await uploadReviewSchema.validate(req.body, {
    abortEarly: false,
  });

  try {
    const response = await axios.post(`${JAVA_BACKEND_URL}/reviews`, validData);

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

const deleteReview = async (req: Request, res: Response) => {

  const id = req.params.id;

  try {
    const response = await axios.delete(`${JAVA_BACKEND_URL}/reviews/${id}`)

    return res.status(200).json({
      message: "Review deleted successfully.",
      response: response.data
    });
  } catch (error: any) {
    console.error("Error deleting review.", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          return res.status(400).json({ message: "Invalid request. Please check the review ID and try again." });
        case 404:
          return res.status(404).json({ message: "Review not found. Please ensure the review exists." });
        case 401:
          return res.status(401).json({ message: "Unauthorized. Please check your credentials." });
        default:
          return res.status(500).json({ message: "An unexpected error occurred while deleting the review. Please try again later." });
      }
    }
  }
}

export { uploadReview, deleteReview }