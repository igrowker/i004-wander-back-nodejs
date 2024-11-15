import { Response, NextFunction } from "express";
import { Request } from "@/types/express-custom";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;

  try {
    // connection with Java DB
    res.sendStatus(201);
  } catch (err) {}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  //Charlie
};

const verify = (req: Request, res: Response, next: NextFunction) => {
  if (req.authError && req.authError.name === "Unauthorized") {
    return res.status(401).json({ message: "JWT expired" });
  }

  res.status(200).json(req.payload);
};

const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    await axios.post(`${JAVA_BACKEND_URL}/invalidate-token`, null, {
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

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada exitosamente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Hubo un problema al cerrar la sesión
 */

export { signup, login, verify, logout };
