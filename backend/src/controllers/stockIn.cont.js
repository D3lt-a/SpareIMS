const pool = require('../config/db');

const register = async (req, res) => {
    const { quantity, unitPrice, totalPrice, date, sparePartID } = req.body;
    const sql = 'INSERT INTO stockIn (siQuant, siUprice, siTprice, siDate, spID) VALUES (?, ?, ?, ?, ?)';
    try {
        await pool.query(sql, [quantity, unitPrice, totalPrice, date, sparePartID])
        res.status(200).json({ message: 'Stock in registered successfully' });
    } catch (error) {
        res.status(500).json({ message:'Error Recording the Stock In', Error: error.message })
    }
}

const retrieve = async (req, res) => {
    const sql = 'SELECT * FROM stockIn';
    try {
        const [rows] = await pool.query(sql)
        res.status(200).json({ message:'Retrieved the Records', Data: rows })
    } catch (error) {
        res.status(500).json({ message:"Error retrieving the Records", Error: error.message })
    }
}

module.exports = { register, retrieve }
















/**
 * Model, COntrollers, ROutes, Server.js, Db.js
 * Queries, Res/Req, endpoints, Brain, Database COnn
 * Model + Controller = Routes
 * -            -     
 * Modle = Controller => Roites
 */

















