import React from 'react'
import { Link } from 'react-router-dom'

import SpareParts from '../pages/SpareParts'
import StockIn from '../pages/StockIn'
import StockOut from '../pages/StockOut'
import Report from '../pages/Report'

function SideBar() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-5">
                <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
                <nav className="flex flex-col space-y-3">
                    <Link
                        to="spares"
                        className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        Spare Parts
                    </Link>
                    <Link
                        to="stockin"
                        className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        Stock In
                    </Link>
                    <Link
                        to="stockout"
                        className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        Stock Out
                    </Link>
                    <Link
                        to="report"
                        className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        Report
                    </Link>
                </nav>
            </aside>
        </div>
    );
}

export default SideBar
