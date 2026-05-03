import React from 'react'
import { logout } from '../services/auth.api.js'
import { useNavigate } from 'react-router-dom'

function TopBar() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await logout()
            if (response) navigate('/register')           
        } catch (error) {
            console.log(error)
        }
    }
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <header className="max-w-screen bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
                Inventory Dashboard
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, { user?.name }</span>
                <button onClick={handleLogout} className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                    Logout
                </button>
            </div>
        </header>
    );
}

export default TopBar
