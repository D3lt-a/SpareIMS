import axios from 'axios'
const baseUrl = 'http://localhost:5000/stock-out';

export const register = async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, formData)
        const data = response.data
        console.log(data.message)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const retrieve = async () => {
    try {
        const response = await axios.get(`${baseUrl}/retrieve`)
        const data = response.data.Data
        const { message, Data } = response.data
        console.log(message)
        return Data
    } catch (error) {
        console.log(error)
    }
}

export const edit = async (id, formData) => {
    try {
        const response = await axios.put(`${baseUrl}/edit/${id}`, formData)
        const data = response.data
        console.log(data.message)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const remove = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/remove/${id}`)
        const data = response.data
        console.log(data.message)
    } catch (error) {
        console.log(error)
    }
}
