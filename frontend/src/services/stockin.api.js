import axios from 'axios'
import { get } from '../services/sparepart.api'
const baseUrl = 'http://localhost:5000/stock-in' 

export const create = async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, formData)
        const data = await response.data
        console.log(data.message)
        return response.ok
    } catch (error) {
        console.log(error)
    }
}

export const retrieve =  async () => {
    try {
        const response = await axios.get(`${baseUrl}/retrieve`)
        const data =  response.data
        console.log(data)
        console.log(data.message)
        return data.Data
    } catch (error) {
        console.log(error)
    }
}