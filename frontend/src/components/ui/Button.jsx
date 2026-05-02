import React from 'react'

function BtnComp({ label, type='button' }) {
    return (
        <div>
            <button
                type={type}
                className="w-full mt-5 cursor-pointer bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition"
            >
                {label}
            </button>
        </div>
    )
}

export default BtnComp
