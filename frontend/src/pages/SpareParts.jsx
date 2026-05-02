import React from 'react'
import FormComp from '../components/ui/Form'
import BtnComp from '../components/ui/Button';
import { create, get } from '../services/sparepart.api.js'

function SpareParts() {
    const [formData, setFormData] = React.useState({
        name: '',
        category: '',
        quantity: '',
        unitPrice: '',
        totalPrice: ''
    });
    const [spares, setSpares] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await create(formData);
            if (response) {
                console.log('Spare Part Created Successfully')
            }
            await getSpares()
            setFormData({
                name: '',
                category: '',
                quantity: '',
                unitPrice: '',
                totalPrice: ''
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getSpares = async () => {
        try {
            const data = await get();
            if (data) setSpares(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        getSpares()
    }, [])
    if (loading) return <p>Getting the Data....</p>
    return (
        <div className='flex gap-4'>
            <div className='w-1/2'>
                <h1 className="text-2xl font-bold mb-4">Add Spare to the Inventory</h1>
                <form action="" onSubmit={handleSubmit}>
                    <FormComp
                        label='Name of the Part'
                        type='text'
                        value={formData.name}
                        placeholder='Spare Part Name'
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                    />
                    <FormComp
                        label='Category'
                        type='text'
                        value={formData.category}
                        placeholder='Spare Part Categiry'
                        onChange={(e) => { setFormData({ ...formData, category: e.target.value }) }}
                    />
                    <FormComp
                        label='Quantity'
                        type='number'
                        value={formData.quantity}
                        placeholder='Quantity of the Spare Part'
                        onChange={(e) => { setFormData({ ...formData, quantity: e.target.value }) }}
                    />
                    <FormComp
                        label='Unit Price'
                        type='number'
                        value={formData.unitPrice}
                        placeholder='Price per Unit'
                        onChange={(e) => { setFormData({ ...formData, unitPrice: e.target.value }) }}
                    />
                    <FormComp
                        label='Total Price'
                        type='number'
                        value={formData.totalPrice}
                        placeholder='Total Price of the Spare Part'
                        onChange={(e) => { setFormData({ ...formData, totalPrice: e.target.value }) }}
                    />
                    <BtnComp
                        label='Add Spare Part'
                        type='submit'
                    />
                </form>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-4">Spare Parts</h1>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Quantity</th>
                                <th className="px-4 py-3 font-medium">Unit Price</th>
                                <th className="px-4 py-3 font-medium">Total Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {spares.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                        No spare parts found
                                    </td>
                                </tr>
                            ) : (
                                spares.map((spare, index) => (
                                    <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900">{spare.spName}</td>
                                        <td className="px-4 py-3 text-gray-600">{spare.spCat}</td>
                                        <td className="px-4 py-3 text-gray-600">{spare.spQuant}</td>
                                        <td className="px-4 py-3 text-gray-600">{spare.spUprice}</td>
                                        <td className="px-4 py-3 text-gray-600">{spare.spTprice}</td>
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

export default SpareParts
