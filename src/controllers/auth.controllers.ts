import * as yup from "yup";
import { Response, Request} from "express";
import axios from "axios";
import { userRegistrationSchema, updateProfileSchema, userVerification } from "../types/yup-validations";
import { ValidationError } from 'yup';

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(404)
            .json({ message: "El email y la contraseña son necesarios" });
    }

    //Add email format validation (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Ingrese un correo electrónico válido" });
    }

    try {
        //Send request to the backend to retrieve the jwt and user info
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/login`, {
            email,
            password,
        });

        //If successful, store the response
        const { token, user, idUser } = response.data;

        //Send the token and and user details
        return res.json({
            message: "Inicio de sesión exitoso",
            token,
            user, 
            userId: idUser
        });

    } catch (error: any) {
        console.error("Error logging in.", error);
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Error de validación",
                errors: error.inner.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return res.status(400).json({ message: "Missing email or password" })
                case 404:
                    return res.status(404).json({ message: "Credenciales incorrectas" });
                case 401:
                    return res.status(401).json({ message: "No autorizado o credenciales incorrectas" });
                default:
                    return res.status(500).json({ message: "Error en la comunicación con el servidor" });
            }
        }
    }
};

const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/logout`, null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.status === 200) {
            return res.status(200).json({ message: "Sesión cerrada exitosamente" });
        } else {
            return res.status(response.status).json({ message: "Error during logout" });
        }

    } catch (error) {
        console.error("Error durante el logout:", error);
        
        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({ error: "Hubo un problema al cerrar la sesión" });
        }

        return res.status(500).json({ error: "Hubo un problema al cerrar la sesión" });
    }
};

const getProfile = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1] || null;

    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // Send a request to the backend to retrieve the user's profile using userId
        const response = await axios.get(`${JAVA_BACKEND_URL}/api/user/profile`, { headers });

        // Extract the user profile data from the response
        const profile = response.data;

        return res.status(200).json({
            message: "Datos recuperados exitosamente.",
            profile
        });

    } catch (error: any) {
        console.error("Error recuperando datos:", error);

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return res.status(401).json({ message: "Acceso no autorizado" });
                case 404:
                    return res.status(404).json({ message: "Perfil no encontrado" });
                default:
                    return res.status(500).json({ message: "Error de servidor interno" });
            }
        }

        return res.status(500).json({ message: "Error de servidor interno" });
    }
};


const updateProfile = async (req: Request, res: Response) => {
    
    const token = req.headers.authorization?.split(" ")[1] || null;
    const validData = await updateProfileSchema.validate(req.body, {
        abortEarly: false,
    });

    if (Object.keys(validData).length === 0) {
        return res.status(400).json({ message: "No se proporcionaron datos para actualizar." });
    }

    try {

        const headers: Record<string, string> = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // Send the updated data to the backend
        const response = await axios.put(`${JAVA_BACKEND_URL}/api/user/profile`, validData, {
            headers
        });

        // If successful, return the updated profile data
        const updatedProfile = response.data;

        return res.status(200).json({
            message: "Perfil actualizado exitosamente",
            updatedProfile,
        });

    } catch (error: any) {
        console.error("Error actualizando perfil:", error);
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Error de validación",
                errors: error.inner.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return res.status(400).json({ message: "Datos proporcionados inválidos" });
                case 401:
                    return res.status(401).json({ message: "Acceso no autorizado" });
                case 404:
                    return res.status(404).json({ message: "Usuario no encontrado" });
                default:
                    return res.status(500).json({ message: "Error de servidor interno" });
            }
        }

        return res.status(500).json({ message: "Error de servidor interno" });
    }
};

const register = async (req: Request, res: Response) => {

    try {
        // Validación de los datos enviados por el frontend
        const validData = await userRegistrationSchema.validate(req.body, {
            abortEarly: false,
        })
        
        const backendResponse = await axios.post(
            `${JAVA_BACKEND_URL}/api/autenticacion/register`,
            validData
        );
        
        const newUser = backendResponse.data
        // Devolver la respuesta del backend al frontend
        return res.status(200).json({
            message: "Usuario registrado correctamente",
            newUser
        });
        
    } catch (error: any) {
        
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Error de validación",
                errors: error.inner.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }
        
        if (axios.isAxiosError(error)) {
            // Manejar un error 409 Conflict
            if (error.response?.status === 409) {
                return res.status(409).json({
                    message: "Esa dirección de email ya ha sido utilizada",
                    details: error.response.data,
                });
            }

            // Otros errores en la comunicación con el backend principal
            return res.status(error.response?.status || 500).json({
                message: "Error en la comunicación con el servidor",
                details: error.response?.data || error.message,
            });
        }
        
        // Otros errores
        return res.status(500).json({
            message: "Error en la comunicación con el servidor",
            details: (error as Error).message, 
        });
    }
};

const verificationCode = async (req: Request, res: Response) => {

    try {

        const validData = await userVerification.validate(req.body, {
            abortEarly: false
        })
        
        // Send a request to the backend to verify the user
        const response = await axios.post(
            `${JAVA_BACKEND_URL}/api/autenticacion/verify-user`, validData);

        // Return the response from the backend
        return res.status(200).json({
            message: "Verificación completada",
            data: response.data,
        });
        
    } catch (error: any) {
        console.error("Error verifying user:", error);
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Código incorrecto",
                errors: error.inner.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }

        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({
                message: "Error en la comunicación con el servidor",
                details: error.response.data,
            });
        }

        return res.status(500).json({ message: "Error en la comunicación con el servidor" });
    }
};

const resendVerificationCode = async (req: Request, res: Response) => {
    
    try {
        const response  = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/reenviar-codigo`)

        return res.status(200).json({
            message: "Code re-sent",
        });

    } catch (error: any) {
        console.error("Error verificando usuario:", error);

        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json({

                message: "Error intentando comunicar con el servicio",
                details: error.response.data,
            });
        }

        return res.status(500).json({ message: "Error de servidor interno" });
    }
};

const verify = (req: Request, res: Response) => {

    if (req.authError && req.authError.name === "Unauthorized") {
        return res.status(401).json({ message: "JWT expired" });
    }

    return res.status(200).json(req.payload);
};

export { register, login, verify, getProfile, logout, updateProfile, verificationCode, resendVerificationCode };
