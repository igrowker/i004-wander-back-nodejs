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
  
      return res.json(experiences);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error to get experiences' });
    }
  }


const getExperienceById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const url = `${JAVA_BACKEND_URL}/experiences/${id}`;
    
    try {
      const response = await axios.get(url);
      const experience = response.data;

      if (response.status === 404) {
        return res.status(404).json({ message: 'Experience not found' });
      } else  if (response.status === 500){
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      return res.json(experience);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: (error as Error).message });
    }
  }

export { getExperiences, getExperienceById };