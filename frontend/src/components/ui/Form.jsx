import React from "react";

function FormComp({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-gray-900
                    focus:border-transparent transition"
            />
        </div>
    );
}

export default FormComp;