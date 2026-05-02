import axios from 'axios'

const baseUrl = 'http://localhost:5000/report'

export const getReport = async () => {
    try {
        const response = await axios.get(`${baseUrl}`)
        return response.data.Data
    } catch (error) {
        console.log(error)
    }
}