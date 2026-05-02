const baseUrl = 'http://localhost:5000/auth'

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
            body: JSON.stringify({email, key})
        })
        const data = await response.json()
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log(data.message)
        console.log(data)
        return response.ok
    } catch (error) {
        console.log(error)
    }
}