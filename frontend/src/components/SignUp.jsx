import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeClosed } from 'lucide-react'
import { signUp } from '../services/auth.api.js'

function SignUp() {
    const [showPass, setShowPass] = React.useState(false)
    const[name, setName] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[key, setKey] = React.useState('');
    const navigate = useNavigate() 

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`name is ${name} \nemail is ${email} \nkey is ${key}`)
        try {
            const response = await signUp(name, email, key);
            if (response) {
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const togglePass = (e) => {
        e.preventDefault();
        setShowPass(prev => !prev)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-5">

                <h2 className="text-xl font-semibold text-center">Create Account</h2>

                <div>
                    <label className="block text-sm font-medium mb-1">User Name</label>
                    <input
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium mb-1">Password</label>

                    <input
                        value={key}
                        onChange={(e)=>{setKey(e.target.value)}}
                        type={showPass ? 'text' : 'password'}
                        name="password"
                        className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                    />

                    <button
                        type="button"
                        onClick={togglePass}
                        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        {showPass ? <EyeClosed size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition"
                >
                    Sign Up
                </button>

                <p className='text-sm font-thin italic'>Already have an account? <Link to='/login' className='text-gray-900 font-bold cursor-pointer'>Login</Link></p>
            </form>
        </div>
    )
}

export default SignUp