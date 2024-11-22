import { Response, NextFunction, Request } from "express";
import axios from "axios";
import * as yup from "yup";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

interface CustomRequest extends Request {
  payload?: any; // Adjust the type as necessary
}

const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(404)
            .json({ message: "Email and password are required." });
    }

    //Add email format validation (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    try {
        //Send request to the backend to retrieve the jwt
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/login`, {
            email,
            password,
        });

        //If successful, store the response
        const { token } = response.data;

        //Send the token and and user details
        return res.json({
            message: "Log in successful",
            token,
        });

    } catch (error: any) {
        console.error("Error logging in.", error);

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return res.status(400).json({ message: "Missing email or password" })
                case 404:
                    return res.status(404).json({ message: "User not found" });
                case 401:
                    return res.status(401).json({ message: "Invalid credentials" });
                default:
                    return res.status(500).json({ message: "Internal server error." });
            }
        }
    }
};

const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    await axios.post(`${JAVA_BACKEND_URL}/api/autenticacion/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status(200).json({ message: "Sesión cerrada exitosamente" });

  } catch (error) {
    console.error("Error durante el logout:", error);
    return res.status(500).json({ error: "Hubo un problema al cerrar la sesión" });
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Send a request to the backend to retrieve the user's profile
        const response = await axios.get(`${JAVA_BACKEND_URL}/api/users/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Extract the user profile data from the response
        const profile = response.data

        return res.status(200).json({
            message: "Retrieved user data successfully.",
            profile
        });

    } catch (error: any) {
        console.error("Error retrieving profile:", error);

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return res.status(401).json({ message: "Unauthorized access" });
                case 404:
                    return res.status(404).json({ message: "Profile not found" });
                default:
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        return res.status(500).json({ message: "Internal server error" });
    }

}

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split("")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const newData = req.body

    if (Object.keys(newData).length === 0) {
        return res.status(400).json({ message: "No data provided to update" });
    }

    try {
        // Send the updated data to the backend
        const response = await axios.put(`${JAVA_BACKEND_URL}/api/users/profile/`, newData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // If successful, return the updated profile data
        const updatedProfile = response.data;

        return res.status(200).json({
            message: "Profile updated successfully",
            updatedProfile,
        });

    } catch (error: any) {
        console.error("Error updating profile:", error);

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return res.status(400).json({ message: "Invalid data provided" });
                case 401:
                    return res.status(401).json({ message: "Unauthorized access" });
                case 404:
                    return res.status(404).json({ message: "User not found" });
                default:
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}

// validando los datos del usuario nuevo
const userRegistrationSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Correo electrónico inválido').required('El correo es obligatorio'),
    password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(12, 'La contraseña no puede tener más de 12 caracteres')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
        'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo (@#!)'
    ),
    role: yup.string().oneOf(['tourist', 'provider'], 'Rol inválido').required('El rol es obligatorio'),
    preferences: yup.array().of(yup.string()).optional(),
    location: yup.string().optional(),
});

const register = async (req: Request, res: Response) => {
    try {
        // Validación de los datos enviados por el frontend
        const validData = await userRegistrationSchema.validate(req.body, {
            abortEarly: false,
        });
        
        const backendResponse = await axios.post(
            `${JAVA_BACKEND_URL}/api/autenticacion/register`,
            validData
        );
        
        const newUser = backendResponse.data
        // Devolver la respuesta del backend al frontend
        return res.status(200).json({
            message: "User registered successfully",
            newUser
        });
        
    } catch (error: any) {
        
        if (error instanceof yup.ValidationError) {
            // Errores de validación
            return res.status(400).json({ errors: error.errors });
        }
        
        if (axios.isAxiosError(error)) {
            // Errores en la comunicación con el backend principal
            return res.status(error.response?.status || 500).json({
                message: "Error communicating with the main backend",
                details: error.response?.data || error.message,
            });
        }
        
        // Otros errores
        return res.status(500).json({
            message: "Internal server error",
            details: (error as Error).message, 
        });
    }
};

const verify = (req: CustomRequest, res: Response, next: NextFunction) => {

    if (req.authError && req.authError.name === "Unauthorized") {
        return res.status(401).json({ message: "JWT expired" });
    }

    return res.status(200).json(req.payload);
};

export { register, login, verify, logout, getProfile, updateProfile };
