import { Response, NextFunction, Request } from "express";
import axios from "axios";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;


const getExperiences = async (req: Request, res: Response) => {

  /**
   *  OTRA MANERA DE HACERLO
   * 
       interface Filters {
          location?: string;
          minPrice?: number;
          maxPrice?: number;
          date?: string;      // Formato ISO (YYYY-MM-DD)
          startDate?: string; // Formato ISO (YYYY-MM-DD)
          endDate?: string;   // Formato ISO (YYYY-MM-DD)
      }
  
      const { location, minPrice, maxPrice, startDate, endDate } = req.query;
      
          // Construir los parámetros de filtro
      const filters: Filters = {
          location: location as string,
          minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
          date: date as string,
          startDate: startDate as string,
          endDate: endDate as string,
      };
  
      // Realizar la solicitud al backend principal con los filtros
      const response = await axios.get(JAVA_BACKEND_URL + '/experiences', { params: filters });
  
      // Enviar los datos filtrados al cliente
      res.json(response.data);
   *
   * 
   * 
   *  
  */


  const filters = req.query;

  try {
    const response = await axios.get(JAVA_BACKEND_URL + '/experiences', { params: filters });
    const experiences = response.data;

    res.json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error to get experiences' });
  }
}


const getExperienceById = async (req: Request, res: Response) => {

  const id = req.params.id;
  const url = `${JAVA_BACKEND_URL}/experiences/${id}`;

  try {
    const response = await axios.get(url);
    const experience = response.data;

    if (response.status === 404) {
      res.status(404).json({ message: 'Experience not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }

    res.json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

const uploadExperience = async (req: Request, res: Response) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const { title, description, location, price, availabilityDates, tags, rating, capacity } = req.body;

  if (!title || !description || !location || !price || !availabilityDates || !tags || !rating || !capacity) {
    return res.status(400).json({ message: 'All fields are required. Please provide title, description, location, price, availabilityDates, tags, rating, and capacity.' });
  }

  // Create validations for all necessary params

  try {
    const response = await axios.post(`${JAVA_BACKEND_URL}/experiences`, {
      title, description, location, price, availabilityDates, tags, rating, capacity
    });

    // If successful send an OK message with the experience details
    const { experience } = response.data;

    res.json({
      message: "Experience created successfully",
      experience
    });
  } catch (error: any) {
    console.error("Error uploading experience.", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          return res.status(400).json({ message: "Invalid input. Please check your data and try again." });
        case 404:
          return res.status(404).json({ message: "User not found. Please ensure the user exists." });
        case 401:
          return res.status(401).json({ message: "Unauthorized. Please check your credentials." });
        default:
          return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
      }
    }
  }
};

const updateExperience = async (req: Request, res: Response) => {

  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const newData = req.body

  if (Object.keys(newData).length === 0) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const response = await axios.put(`${JAVA_BACKEND_URL}/experiences/${id}`, newData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const updatedExperience = response.data
    res.status(200).json({
      message: "Experience updated successfully",
      updatedExperience
    });

  } catch (error: any) {
    console.error("Error updating experience:", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          return res.status(400).json({ message: "Invalid data provided" });
        case 401:
          return res.status(401).json({ message: "Unauthorized access" });
        case 404:
          return res.status(404).json({ message: "Experience not found" });
        default:
          return res.status(500).json({ message: "Internal server error" });
      }
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export { getExperiences, getExperienceById, uploadExperience, updateExperience };