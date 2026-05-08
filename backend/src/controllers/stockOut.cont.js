const pool = require('../config/db');

const register = async (req, res) => {
    const { quantity, unitPrice, totalPrice, date, sparePartID, stockInID } = req.body;
    const sql = 'INSERT INTO stockOut(soQuant, soUprice, soTprice, soDate, spID, siID) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        await pool.query(sql, [quantity, unitPrice, totalPrice, date, sparePartID, stockInID])
        res.status(200).json({ message: 'Stock out registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering stock out', Error: error.message });
    }
}

const retrieve = async (req, res) => {
    const sql = 'SELECT * FROM stockOut';
    try {
        const [rows] = await pool.query(sql)
        res.status(200).json({ message:"Stock Out Records Retrieved Successfully", Data: rows })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stock out records', Error: error.message });
    }
}

const edit = async (req, res) => {
    const { id } = req.params;
    const { quantity, unitPrice, totalPrice, date, sparePart } = req.body;
    try {
        const [result] = await pool.query('UPDATE stockOut set soQuant = ?, soUprice = ?, soTprice = ?, soDate = ?, spID = ? WHERE soID = ?', 
            [quantity, unitPrice, totalPrice, date, sparePart, id]
        )
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Stock out record not found' });
        }
        res.status(200).json({ message: 'Stock out record updated successfully', Updated_Record : result });
    } catch (error) {
        res.status(500).json({ message:'Error updating stock out record', Error: error.message });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM stockOut WHERE soID = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Stock out record not found' });
        }
        res.status(200).json({ message: 'Stock out record deleted successfully', Deleted_Record : result });
    } catch (error) {
        res.status(500).json({ message:'Error deleting stock out record', Error: error.message });
    }
}

module.exports = { register, retrieve, edit, remove }