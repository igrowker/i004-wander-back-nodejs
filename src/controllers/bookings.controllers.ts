import { Response, NextFunction, Request } from "express";
import axios from "axios";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const getBookingsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
        const response = await axios.get(`${JAVA_BACKEND_URL}/bookings`, {
            headers: { Authorization: token },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getBookingsById };