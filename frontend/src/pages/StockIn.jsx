import React from 'react'
import { create, retrieve } from '../services/stockin.api.js'
import { get } from '../services/sparepart.api.js'
import FormComp from '../components/ui/Form.jsx'
import BtnComp from '../components/ui/Button.jsx'

function stockIns() {
    const [formData, setFormData] = React.useState({
        quantity: '',
        unitPrice: '',
        totalPrice: '',
        date: '',
        sparePartID: ''
    })
    const [stockIns, setStockIns] = React.useState([])
    const [names, setNames] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const getNames = async () => {
        try {
            const data = await get()
            const dataNames = data.map((d) => ({
                name: d.spName,
                id: d.spID
            }))
            setNames(dataNames)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await create(formData)
            if (response) console.log('Stock In Created Successfully')
            await getData()
            setFormData({
                quantity: '',
                unitPrice: '',
                totalPrice: '',
                date: '',
                sparePartID: ''
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getData = async () => {
        try {
            const data = await retrieve()
            if (!data) console.log('No Data Obtained')
            setStockIns(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const dict = {}
    names.forEach(item => dict[item.id] = item.name)
    React.useEffect(() => {
        getData()
        getNames()
    }, [])
    return (
        <div className='flex gap-4'>
            <div className='w-1/2'>
                <h1 className="text-2xl font-bold mb-4">Add Stock-Ins</h1>
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
                                <option key={name.id} value={name.id}>{name.name}</option>
                            ))}
                        </select>
                    </div>
                    <FormComp
                        label='Quantity'
                        type='number'
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    <FormComp
                        label='Unit Proce'
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
                        label='Add stockIns'
                        type='submit'
                    />
                </form>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-4">Stock-Ins</h1>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Quantity</th>
                                <th className="px-4 py-3 font-medium">Unit Price</th>
                                <th className="px-4 py-3 font-medium">Total Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className='px-4 py-6 text-center text-gray-400'>
                                        Getting the Data...
                                    </td>
                                </tr>
                            ) :
                                stockIns.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                            No stock in found
                                        </td>
                                    </tr>
                                ) : (
                                    stockIns.map((stockIn, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">{dict[stockIn.spID]}</td>
                                            <td className="px-4 py-3 text-gray-600">{new Date(stockIn.siDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockIn.siQuant}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockIn.siUprice}</td>
                                            <td className="px-4 py-3 text-gray-600">{stockIn.siTprice}</td>
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

export default stockIns