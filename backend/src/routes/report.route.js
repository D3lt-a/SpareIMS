const express = require('express')
const pool = require('../config/db')
const router = express.Router();

router.get('/',async (req, res) => {
    try {
        const [spares] = await pool.query('SELECT * FROM spareParts');
        const [stockIns] = await pool.query('SELECT spID, siQuant, siTprice FROM stockIn');
        const [stockOuts] = await pool.query('SELECT spID, soQuant, soTprice FROM stockOut');
        
        const report = spares.map((spare) => {
            const ins = stockIns.filter(s => s.spID === spare.spID)
            const outs = stockOuts.filter(s => s.spID === spare.spID)

            const totalOuts = outs.reduce((sum, s) => sum + s.soQuant, 0);
            const totalIns = ins.reduce((sum, s) => sum + s.siQuant, 0);
            const totalValue = ins.reduce((sum, s) => sum + s.siTprice, 0);

            return {
                name: spare.spName,
                totalIns,
                totalOuts,
                totalValue,
                remaining : totalIns - totalOuts
            }
        })
        res.status(200).json({ message: 'Report retrieved successfully', Data: report })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Report records', Error: error.message });
    }
})

module.exports = router