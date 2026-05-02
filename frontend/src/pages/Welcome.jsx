import { Link } from "react-router-dom";

function Welcome() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
            <h1 className="text-6xl font-bold text-gray-800">Welcome</h1>

            <p className="text-xl text-gray-600 mt-4">
                Simple Inventory Management System.
            </p>

            <p className="text-gray-500 mt-2">
                You can Proceed
            </p>

            <Link
                to="/dashboard"
                className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            >
                Go to Dashboard
            </Link>
        </div>
    );
}

export default Welcome;