const pool = require('../config/db');

const register = async (req, res) => {
    const { name, category, quantity, unitPrice, totalPrice } = req.body;
    const sql = 'INSERT INTO spareParts (spName, spCat, spQuant, spUprice, spTprice) VALUES (?, ?, ?, ?, ?)';
    try {
        await pool.query(sql, [name, category, quantity, unitPrice, totalPrice]);
        res.status(201).json({ message: 'Spare part registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering spare part', Error: error.message });
    }
} 

const retrieve = async (req, res) => {
    const sql = 'SELECT * FROM spareParts';
    try {
        const [rows] = await pool.query(sql);
        res.status(200).json({ message: "Spare Parts Retrieved Successfully", Data: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving spare parts', Error: error.message });
    }
}

module.exports = { register, retrieve }