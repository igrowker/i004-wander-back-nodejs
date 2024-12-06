import { Response, Request } from "express";
import axios from "axios";
import { uploadExperienceSchema, updateExperienceSchema } from "../types/yup-validations";
import { ValidationError } from "yup";
import * as yup from "yup";

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

const getExperiences = async (req: Request, res: Response) => {

  const filters = req.query;

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences`, { params: filters });
    const experiences = response.data;

    if (!experiences || experiences.length === 0) {
      return res.status(404).json({ message: 'No experiences found' });
    }

    return res.json(experiences);
    
  } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
              case 400:
                  return res.status(400).json({ message: "Bad request. Please check your parameters." });
              case 404:
                  return res.status(404).json({ message: "Not found. Please check the URL." });
              case 500:
                  return res.status(500).json({ message: "Internal server error. :(" });
              default:
                  return res.status(500).json({ message: "An unexpected error occurred." });
          }
      }
      return res.status(500).json({ message: 'Error to get experiences', error: (error as Error).message });
  }
};


const getExperienceById = async (req: Request, res: Response) => {

  const id = req.params.id;
  const url = `${JAVA_BACKEND_URL}/experiences/${id}`;

  try {
    const response = await axios.get(url);
    const experience = response.data;

    if (response.status === 404) {
      return res.status(404).json({ message: 'Experience not found' });
    } else if (response.status === 500) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.json(experience);
    
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: (error as Error).message });
  }
}

const getTopRatedExperiences = async (req: Request, res: Response) => {
  const filters = req.query;

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences/top-rated`, { params: filters });
    const topRatedExperiences = response.data

    if (!topRatedExperiences || topRatedExperiences.length === 0) {
      return res.status(404).json({ message: 'No top-rated experiences found' });
    }

    return res.json(topRatedExperiences)

  } catch (error) {
    console.error(error);
      if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
              case 400:
                  return res.status(400).json({ message: "Bad request. Please check your parameters." });
              case 404:
                  return res.status(404).json({ message: "Not found. Please check the URL." });
              case 500:
                  return res.status(500).json({ message: "Internal server error." });
              default:
                  return res.status(500).json({ message: "An unexpected error occurred." });
          }
      }
      return res.status(500).json({ message: 'Error to get top-rated experiences', error: (error as Error).message });
  }
};

const getMostBookedExperiences = async (req: Request, res: Response) => {
  const filters = req.query;

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences/most-reserved`, { params: filters });
    const mostBooked = response.data

    if (!mostBooked || mostBooked.length === 0) {
      return res.status(404).json({ message: 'No most-booked experiences found' });
    }

    return res.json(mostBooked)

  } catch (error) {
    console.error(error);
      if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
              case 400:
                  return res.status(400).json({ message: "Bad request. Please check your parameters." });
              case 404:
                  return res.status(404).json({ message: "Not found. Please check the URL." });
              case 500:
                  return res.status(500).json({ message: "Internal server error." });
              default:
                  return res.status(500).json({ message: "An unexpected error occurred." });
          }
      }
      return res.status(500).json({ message: 'Error to get most-booked experiences', error: (error as Error).message });
  }
};

const getLatestExperiences = async (req: Request, res: Response) => {
  const filters = req.query;

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences/latest`, { params: filters });
    const latestExperiences = response.data

    if (!latestExperiences || latestExperiences.length === 0) {
      return res.status(404).json({ message: 'Latest experiences not found' });
    }

    return res.json(latestExperiences)

  } catch (error) {
    console.error(error);
      if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
              case 400:
                  return res.status(400).json({ message: "Bad request. Please check your parameters." });
              case 404:
                  return res.status(404).json({ message: "Not found. Please check the URL." });
              case 500:
                  return res.status(500).json({ message: "Internal server error." });
              default:
                  return res.status(500).json({ message: "An unexpected error occurred." });
          }
      }
      return res.status(500).json({ message: 'Error to get latest experiences', error: (error as Error).message });
  }
};

const getExperiencesByHost = async (req: Request, res: Response) => {
  const filters = req.query;
  const { id } = req.params

  if(!id) {
    return res.status(400).json({ message: "Error: ID parameter is required." })
  }

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences/host/${id}`, { params: filters });
    const hostExperiences = response.data

    if (!hostExperiences || hostExperiences.length === 0) {
      return res.status(404).json({ message: 'No experiences found from provided host' });
    }

    return res.json(hostExperiences)

  } catch (error) {
    console.error(error);
      if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
              case 400:
                  return res.status(400).json({ message: "Bad request. Please check your parameters." });
              case 404:
                  return res.status(404).json({ message: "Not found. Please check the URL." });
              case 500:
                  return res.status(500).json({ message: "Internal server error." });
              default:
                  return res.status(500).json({ message: "An unexpected error occurred." });
          }
      }
      return res.status(500).json({ message: 'Error to get experiences from host', error: (error as Error).message });
  }
};

const uploadExperience = async (req: Request, res: Response) => {

  const token = req.headers.authorization?.split(" ")[1];
  const validData = await uploadExperienceSchema.validate(req.body, {
    abortEarly: false,
  });

  try {

    const response = await axios.post(`${JAVA_BACKEND_URL}/experiences`, {
      ...validData
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { experience } = response.data;

    return res.status(201).json({
      message: "Experience created successfully",
      experience
    });
    
  } catch (error: any) {
    console.error("Error uploading experience.", error);
    if (error instanceof ValidationError) {
      return res.status(400).json({
          message: "Error de validación creando experiencia",
          errors: error.inner.map((err) => ({
              path: err.path,
              message: err.message,
          })),
      });
    }
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

  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  const validData = await updateExperienceSchema.validate(req.body, {
    abortEarly: false,
  });

  if (Object.keys(validData).length === 0) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {

    const response = await axios.put(`${JAVA_BACKEND_URL}/experiences/${id}`, {
      ...validData
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const updatedExperience = response.data;
    
    return res.status(200).json({
      message: "Experience updated successfully",
      updatedExperience
    });

  } catch (error: any) {
    console.error("Error updating experience:", error);
    if (error instanceof ValidationError) {
      return res.status(400).json({
          message: "Error de validación actualizando experiencia",
          errors: error.inner.map((err) => ({
              path: err.path,
              message: err.message,
          })),
      });
  }

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

const getTags = async (req: Request, res: Response) => {

  try {
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences/tags`);
    const tags = response.data;

    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: 'No tags found' });
    }

    return res.json(tags)
  } catch (error) {
    console.error(error);
      if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
              case 400:
                  return res.status(400).json({ message: "Bad request. Please check your parameters." });
              case 404:
                  return res.status(404).json({ message: "Not found. Please check the URL." });
              case 500:
                  return res.status(500).json({ message: "Internal server error." });
              default:
                  return res.status(500).json({ message: "An unexpected error occurred." });
          }
      }
      return res.status(500).json({ message: 'Error to get tags', error: (error as Error).message });
  }
};

const getExperiencesByTag = async (req: Request, res: Response) => {

  const { tag } = req.params;

  try {

    if (!tag) {
      return res.status(400).json({ message: "Error: ID parameter is required." });
    }
    const response = await axios.get(`${JAVA_BACKEND_URL}/experiences/tags/${tag}`);
    const experiencesByTag = response.data;

    if (!experiencesByTag || experiencesByTag.length === 0) {
      return res.status(404).json({ message: 'No experiences found with provided tag' });
    }
    return res.json(experiencesByTag);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
            case 400:
                return res.status(400).json({ message: "Bad request. Please check your parameters." });
            case 404:
                return res.status(404).json({ message: "Not found. Please check the URL." });
            case 500:
                return res.status(500).json({ message: "Internal server error." });
            default:
                return res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
    return res.status(500).json({ message: 'Error to get experiences by tag', error: (error as Error).message });
  }
};

export { getExperiences, getExperienceById, uploadExperience, updateExperience, getTopRatedExperiences, getMostBookedExperiences, getLatestExperiences, getExperiencesByHost, getTags, getExperiencesByTag };