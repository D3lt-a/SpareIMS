import axios from 'axios'
const baseURL = 'http://localhost:5000/spare-parts'

export const create = async (formData) => {
    try {
        const response = await axios.post(`${baseURL}/register`, formData)
        const data = await response.data
        console.log(data.message)
        return response.ok
    } catch (error) {
        console.log(error) 
    }
}

export const get = async () => {
    try {
        const response = await axios.get(`${baseURL}/retrieve`)
        const spares = response.data.Data
        console.log(spares.message)
        return spares
    } catch (error) {
        console.log(error)
    }
}