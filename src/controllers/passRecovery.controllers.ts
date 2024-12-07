import { Response, Request } from 'express'
import axios from 'axios';
import { passwordChangeSchema } from '../types/yup-validations';
import { ValidationError } from 'yup';
import * as yup from "yup";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const recoverPassword = async (req: Request, res: Response) => {

    const { email } = req.body;

    if (!email) {
        return res.status(404).json({message: "El correo electrónico es obligatorio"})
    }

    //Add email format validation (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Ingrese un correo electrónico válido" });
    }

    try {
        //Send request to the backend to create a recovery code sent to email
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/forgot-password`, {
            email,
        });

        return res.json({
            message: "Petición de recuperación de contraseña existosa",
            result: response.data
        })
    } catch (error: any) {
        console.log("Error requesting password recovery.", error)

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    return res.status(404).json({ message: "No se ha encontrado al usuario" });
                case 401:
                    return res.status(401).json({ message: "Credenciales incorrectas" });
                default:
                    return res.status(500).json({ message: "Error en la comunicación con el servidor" });
            }
        }
    }
};

const createNewPassword = async (req: Request, res: Response) => {

    const validData = await passwordChangeSchema.validate(req.body, {
        abortEarly: false
    });

    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/reset-password`, validData);
    
        if (response.status === 200) {
            return res.status(200).json({ message: "New password set successfully" });
        } else {
            return res.status(response.status).json({ message: "Error password change" });
        }
    } catch (error: any) {
        console.error("Error creating new password:", error.message || error);
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Error de validación creando nueva contraseña",
                errors: error.inner.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors
            });
        }
    }
};

export { recoverPassword, createNewPassword }