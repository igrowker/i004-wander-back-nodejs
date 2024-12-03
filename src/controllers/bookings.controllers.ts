import { Response, Request } from "express";
import axios from "axios";
import { bookingSchema } from "../types/yup-validations";
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
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Añadir token en headers
const makeBookings = async (req: Request, res: Response) => {
  try {
    const validatedData = await bookingSchema.validate(req.body);

    const response = await axios.post(`${JAVA_BACKEND_URL}/bookings`, validatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      const reserva = response.data;
      res.status(201).json({ message: 'Booking confirmed', reserva });
    } else {
      res.status(400).json({ message: 'Booking rejected' });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Error de validación de datos
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Error processing the request' });
    }
  }
};

  //GET bookings/experience/{experienceId}
  //GET bookings/user/{userId}

export { getBookingsById, makeBookings };