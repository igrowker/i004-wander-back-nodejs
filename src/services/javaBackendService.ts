import axios from 'axios'

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || 'http://localhost:8080'

const fetchDataFromJavaBackend = async (endpoint: string, params = {}) => {
    try {
        const response = await axios.get(`${JAVA_BACKEND_URL}/${endpoint}`, { params })
        return response.data
    } catch (error) {
        console.error('Error communicating with Java backend:', error)
        throw error
    }
}

const sendImageUrlToJavaBackend = async (url: string, owner: string) => {
    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/api/upload`, {
            owner,
            url
        })
        return response.data
    } catch (error) {
        throw new Error('Error sending image URL to Java backend')
    }
}

export { fetchDataFromJavaBackend, sendImageUrlToJavaBackend }
