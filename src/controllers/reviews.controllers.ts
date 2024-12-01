import { Response, Request, NextFunction } from "express";
import axios from "axios";
import { uploadReviewSchema, updateReviewSchema } from "../types/yup-validations";
import * as yup from "yup";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const uploadReview = async (req: Request, res: Response) => {

  const token = req.headers.authorization?.split(" ")[1];
  const validData = await uploadReviewSchema.validate(req.body, {
    abortEarly: false,
  });

  try {

    const response = await axios.post(`${JAVA_BACKEND_URL}/reviews`, {
      ...validData
    }, {
      headers: { Authorization: `Bearer ${token}` }
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

const deleteReview = async (req: Request, res: Response) => {

  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const response = await axios.delete(`${JAVA_BACKEND_URL}/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

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

const updateReview = async (req: Request, res: Response) => {

  const token = req.headers.authorization?.split(" ")[1];

  try {

    const validData = await updateReviewSchema.validate(req.body, {
      abortEarly: false,
    });
  
    const { reviewId, rating, comment, userId } = validData;
  
    //Esta validación se debe de hacer en el yup
    if (!reviewId || !userId) {
      return res.status(400).json({ error: "reviewId and userId are required" });
    }

    // Ya nos viene la info de la reseña desde el front!
    // Consulta al backend principal para obtener la reseña
    const reviewResponse = await axios.get(`${JAVA_BACKEND_URL}/reviews/${reviewId}`);
    const review = reviewResponse.data;

    if (!review || !review.userId) {
      return res.status(404).json({ error: "Review not found." });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ error: "You do not have permission to update this review" });
    }

    // Construcción dinámica de los datos a actualizar
    const updateData: Record<string, any> = {
      userId: review.userId,
    };
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;

    // Actualización de la reseña
    const updateResponse = await axios.put(`${JAVA_BACKEND_URL}/reviews/${reviewId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.json(updateResponse.data);
  } catch (error) {

    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        errors: error.errors,
      });
    }

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || "Internal server error";
      return res.status(status).json({ error: message });
    }

    console.error("Error updating review:", error);
    res.status(500).json({ error: "Error updating review." });
  }
}

export { uploadReview, deleteReview, updateReview }