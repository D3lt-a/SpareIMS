import React from 'react'
import { getReport } from '../services/report.api'
import BtnComp from '../components/ui/Button'

function Report() {
    const [report, setReport] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const fetchReport = async () => {
        try {
            const data = await getReport()
            setReport(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const exportReport = ({ data }) => {
        window.print(data)
    }

    const totalValue = report.reduce((sum, row) => sum + row.totalValue, 0)
    const totalRemaining = report.reduce((sum, row) => sum + row.remaining, 0)
    
    React.useEffect(() => {
        fetchReport()
    }, [])
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Report</h1>

            <div className="flex gap-4 mb-6">
                <div className="border rounded-lg p-4 w-1/3">
                    <p className="text-gray-500 text-sm">Total Spare Parts</p>
                    <p className="text-2xl font-bold">{report.length}</p>
                </div>
                <div className="border rounded-lg p-4 w-1/3">
                    <p className="text-gray-500 text-sm">Total Remaining Stock</p>
                    <p className="text-2xl font-bold">{totalRemaining}</p>
                </div>
                <div className="border rounded-lg p-4 w-1/3">
                    <p className="text-gray-500 text-sm">Total Value</p>
                    <p className="text-2xl font-bold">{totalValue} Frw</p>
                </div>
                <button 
                    onClick={exportReport}
                    className="w-full mt-5 cursor-pointer bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition" >
                    Export
                </button>
            </div>

            <div id="printable" className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-4 py-3">Spare Part</th>
                            <th className="px-4 py-3">Total Stock In</th>
                            <th className="px-4 py-3">Total Stock Out</th>
                            <th className="px-4 py-3">Remaining</th>
                            <th className="px-4 py-3">Total Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                    Getting the data...
                                </td>
                            </tr>
                        ) : report.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            report.map((row, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{row.name}</td>
                                    <td className="px-4 py-3">{row.totalIns}</td>
                                    <td className="px-4 py-3">{row.totalOuts}</td>
                                    <td className={`px-4 py-3 font-bold ${row.remaining < 5 ? 'text-red-500' : 'text-green-500'}`}>
                                        {row.remaining}
                                    </td>
                                    <td className="px-4 py-3">{row.totalValue} Frw</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Report