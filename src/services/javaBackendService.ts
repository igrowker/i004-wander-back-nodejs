import axios from 'axios'

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || 'http://localhost:8080'

export const fetchDataFromJavaBackend = async (endpoint: string, params = {}) => {
    try {
        const response = await axios.get(`${JAVA_BACKEND_URL}/${endpoint}`, { params })
        return response.data
    } catch (error) {
        console.error('Error communicating with Java backend:', error)
        throw error
    }
}
