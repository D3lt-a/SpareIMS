const baseUrl = 'http://localhost:5000/auth'
import axios from 'axios'

export const signUp = async (name, email, key) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, key })
        })
        const data = await response.json()
        console.log(data.message)
        console.log(data)
        return response.ok
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (email, key) => {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({email, key})
        })
        const data = await response.json()
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log(data.message)
        return response.ok
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${baseUrl}/logout`)
        const data = await response.data
        console.log(data)
        console.log(data.message)
        return response.data.success
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async () => {
    try {
        const response = await axios.get(`${baseUrl}/isme`, { withCredentials: true })
        const data = await response.data
        console.log(data.message)
        return response.data.success
    } catch (error) {
        console.log(error)
    }
}

export const getProtected = async () => {
    try {
        const response = await axios.get(`${baseUrl}/protected`)
        const data = await response.data
        console.log(data.message)
        return response.ok
    } catch (error) {
        console.log(error)
    }
}