import React from 'react'
import { register, retrieve, edit, remove } from '../services/stockout.api'
import { get } from '../services/sparepart.api'
import { retrieve as retrieveStockIns } from '../services/stockin.api'
import FormComp from '../components/ui/Form'
import BtnComp from '../components/ui/Button'

function StockOut() {
    const [formData, setFormData] = React.useState({
        quantity: '',
        unitPrice: '',
        totalPrice: '',
        date: '',
        sparePartID: '',
        stockInID: ''
    })
    const [id, setID] = React.useState({
        id: ''
    })
    const [names, setNames] = React.useState([])
    const [stockOuts, setStockOuts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [stockIns, setStockIns] = React.useState([])
    const [editingID, setEditingID] = React.useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingID) {
                await edit(editingID, formData)
                setEditingID(null)
            }
            await getStockout()
            const response = await register(formData)
            if (response) console.log('Stock Out Added Successfully!!')
            setFormData({
                quantity: '',
                unitPrice: '',
                totalPrice: '',
                date: '',
                sparePartID: '',
                stockInID: ''
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getStockIns = async () => {
        const data = await retrieveStockIns()
        setStockIns(data)
    }

    const getStockout = async () => {
        try {
            const data = await retrieve()
            if (!data) console.log('No Data Obtained')
            setStockOuts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const editStockout = async (stockOut) => {
        setEditingID(stockOut.soID)
        setFormData({
            quantity: stockOut.soQuant,
            unitPrice: stockOut.soUprice,
            totalPrice: stockOut.soTprice,
            date: stockOut.soDate,
            sparePartID: stockOut.spID,
            stockInID: stockOut.siID
        })
    }

    const removeStockout = async (id) => {
        try {
            await remove(id)
            await getStockout()
        } catch (error) {
            console.log(error)
        }
    }

    const getNames = async () => {
        try {
            const data = await get()
            const dataNames = data.map((d) => ({
                name: d.spName,
                dID: d.spID
            }))
            setNames(dataNames)
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalPrice = () => {
        let total = formData.quantity * formData.unitPrice
        setTprice(total)
    }

    const dict = {}
    names.forEach(item => dict[item.dID] = item.name)

    const filteredStockIns = stockIns.filter(d => d.spID == formData.sparePartID)

    React.useEffect(() => {
        getStockout(),
            getNames(),
            getStockIns()
    }, [])
    return (
        <div className='flex gap-4'>
            <div className='w-1/2'>
                <h1 className="text-2xl font-bold mb-4">Add Stock-Outs</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-1">
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-gray-900
                    focus:border-transparent transition" name="" id=""
                            value={formData.sparePartID}
                            onChange={(e) => setFormData({ ...formData, sparePartID: e.target.value })}
                        >
                            <option value="">Spare Parts</option>
                            {names.map((name) => (
                                <option key={name.dID} value={name.dID}>{name.name}</option>
                            ))}
                        </select>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-gray-900
                    focus:border-transparent transition" name="" id=""
                            value={formData.stockInID}
                            onChange={(e) => setFormData({ ...formData, stockInID: e.target.value })}
                        >
                            <option value="">
                                {formData.sparePartID ? 'Select Stock In' : 'Select a Spare Part First'}
                            </option>
                            {filteredStockIns.length == 0 ? (
                                <option value="" disabled>No Stock Ins</option>
                            ) : (
                                filteredStockIns.map((d) => (
                                    <option value={d.siID} key={d.siID}>
                                        Stock In # {d.siID} - Quantity {d.siQuant}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <FormComp
                        label='Quantity'
                        type='number'
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    <FormComp
                        label='Unit Price'
                        type='number'
                        value={formData.unitPrice}
                        onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    />
                    <FormComp
                        label='Total Price'
                        type='number'
                        value={formData.totalPrice}
                        onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                    />
                    <FormComp
                        label='Date'
                        type='date'
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    <BtnComp
                        label={editingID ? 'Update the Record':'Add a Record'}
                        type='submit'
                    />
                </form>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-4">Stock-Outs</h1>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">StockIn ID</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Quantity</th>
                                <th className="px-4 py-3 font-medium">Unit Price</th>
                                <th className="px-4 py-3 font-medium">Total Price</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan={6} className='px-4 py-6 text-center text-gray-400'>
                                            Getting the Data...
                                        </td>
                                    </tr>
                                ) : stockOuts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                            No stock in found
                                        </td>
                                    </tr>
                                ) : (
                                    stockOuts.map((stockOut, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">{dict[stockOut.spID]}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockOut.siID}</td>
                                            <td className="px-4 py-3 text-gray-600">{new Date(stockOut.soDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockOut.soQuant}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockOut.soUprice}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockOut.soTprice}</td>
                                            <td className="px-4 py-3 text-gray-600">
                                                <button
                                                    onClick={() => editStockout(stockOut)}
                                                    className="px-4 py-3 text-gray-900 cursor-pointer hover:bg-green-500 bg-green-400 rounded  font-bold">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => removeStockout(stockOut.soID)}
                                                    className="px-4 py-3 text-gray-900 cursor-pointer hover:bg-red-500 bg-red-400 rounded  font-bold">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StockOut
