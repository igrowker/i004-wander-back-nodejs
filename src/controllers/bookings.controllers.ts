import { Response, NextFunction, Request } from "express";
import axios from "axios";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const getBookingsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const response = await axios.get(`${JAVA_BACKEND_URL}/bookings/${id}`, {
            headers: { Authorization: token },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getBookingsById };