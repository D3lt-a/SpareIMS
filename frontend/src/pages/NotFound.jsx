import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>

            <p className="text-xl text-gray-600 mt-4">
                Oops! Page not found.
            </p>

            <p className="text-gray-500 mt-2">
                The page you’re looking for doesn’t exist or was moved.
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

export default NotFound;