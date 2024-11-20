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


export { getExperiences };