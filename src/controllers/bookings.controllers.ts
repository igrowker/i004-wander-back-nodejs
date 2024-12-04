import { Response, Request } from "express";
import axios from "axios";
import { bookingSchema, updateBookingSchema } from "../types/yup-validations";
import * as yup from "yup";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const getBookingsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const makeBookings = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const validatedData = await bookingSchema.validate(req.body);

    const response = await axios.post(
      `${JAVA_BACKEND_URL}/bookings`,
      validatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );

    if (response.status === 201) {
      const reserva = response.data;
      res.status(201).json({ message: "Booking confirmed", reserva });
    } else {
      res.status(400).json({ message: "Booking rejected" });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Error de validación de datos
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error processing the request" });
    }
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const validatedData = await updateBookingSchema.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;
    const { bearerToken } = req.headers;

    if (!bearerToken) {
      return res.status(401).json({ error: "Bearer token is required" });
    }

    const booking = {
      experienceId: validatedData.experienceId,
      userId: validatedData.userId,
      status: validatedData.status,
      totalPrice: validatedData.totalPrice,
      participants: validatedData.participants,
      paymentStatus: validatedData.paymentStatus,
    };

    const response = await axios.put(
      `${JAVA_BACKEND_URL}/bookings/${id}`,
      booking,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        error: "Error processing from yup validation",
        details: error.inner.map((err) => err.message),
      });
    } else {
      return res.status(500).json({ error: "Error processing the request" });
    }
  }
};

const getBookingsByExperience = async (req: Request, res: Response) => {
  const { experienceId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Bearer token is required" });
  }

  try {
    const response = await axios.get(
      `${JAVA_BACKEND_URL}/bookings/experience/${experienceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookingsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Bearer token is required" });
  }

  try {
    const response = await axios.get(
      `${JAVA_BACKEND_URL}/bookings/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getBookingsById,
  makeBookings,
  updateBooking,
  getBookingsByUser,
  getBookingsByExperience,
};
