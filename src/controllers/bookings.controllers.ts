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
    res.status(500).json({ message: "Error de servidor interno" });
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
      res.status(201).json({ message: "Booking confirmado", reserva });
    } else {
      res.status(400).json({ message: "Booking rechazado" });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Error de validación de datos
      res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error procesando la petición" });
    }
  }
};

const updateBooking = async (req: Request, res: Response) => {

  const token = req.headers.authorization?.split(" ")[1];

  try {
    const validatedData = await updateBookingSchema.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    if (!token || token.length === 0) {
      return res.status(401).json({ error: "El token es requerido" });
    }

    const booking = {
      userId: validatedData.userId,
      status: validatedData.status,
    };

    const response = await axios.put(
      `${JAVA_BACKEND_URL}/bookings/${id}`,
      booking,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
      return res.status(500).json({ error: "Error procesando la request" });
    }
  }
};

const getBookingsByExperience = async (req: Request, res: Response) => {
  const { experienceId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Bearer token es requerido" });
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
    res.status(500).json({ message: "Error de servidor interno" });
  }
};

const getBookingsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Bearer token es requerido" });
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
    res.status(500).json({ message: "Error de servidor interno" });
  }
};

export {
  getBookingsById,
  makeBookings,
  updateBooking,
  getBookingsByUser,
  getBookingsByExperience,
};
