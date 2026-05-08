import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { getMe } from '../services/auth.api'

function ProtectedRoute() {
    const [loading, setLoading] = React.useState(true)
    const [isUser, setIsUser] = React.useState(false)
    const navigate = useNavigate()
    const isMe = async () => {
        try {
            const response = await getMe()
            if (!response) {
                navigate('/register')
            } else {
                setIsUser(true)
            }
        } catch (error) {
            console.log(error)
            navigate('/register')
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        isMe()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-600 text-lg">Getting your data...</p>
            </div>
        );
    }

    return isUser ? <Outlet /> : null
}

export default ProtectedRoute