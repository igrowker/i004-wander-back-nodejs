import { Response, NextFunction, Request } from "express";
import axios from "axios";
import * as yup from "yup";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

interface CustomRequest extends Request {
  payload?: any; // Adjust the type as necessary
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;

  try {
    // connection with Java DB
    res.sendStatus(201);
  } catch (err) {}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  //Charlie

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
    const response = await axios.post(`${JAVA_BACKEND_URL}/users/login`, {
      email,
      password,
    });

    //If successful, store the response
    const { token } = response.data;

    //Send the token and and user details
    res.json({
      message: "Log in successful",
      token,
    });
  } catch (error: any) {
    console.log("Error logging in.", error);

    if (error.response) {
      switch (error.response.status) {
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

const verify = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.authError && req.authError.name === "Unauthorized") {
    return res.status(401).json({ message: "JWT expired" });
  }

  res.status(200).json(req.payload);
};

const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    await axios.post(`${JAVA_BACKEND_URL}/users/logout`, null, {
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
      `${JAVA_BACKEND_URL}/users/register`,
      validData
    );

    // Devolver la respuesta del backend al frontend
    return res.status(backendResponse.status).json(backendResponse.data);
  } catch (error) {
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

export { signup, login, verify, logout, register };
