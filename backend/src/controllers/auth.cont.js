const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, key } = req.body;
    const hashedKey = await bcrypt.hash(key, 10);
    const sql = 'INSERT INTO users (userName, userEmail, userKey) VALUES (?, ?, ?)';
    try {
        await pool.query(sql, [name, email, hashedKey]);
        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', Error: error.message, success: false });
    }
}

/** 
 * LOGIN CREDENTIALS:
 * {
 *      email: delta@mail.com,
 *      key: delta@key
 * }
 */

const login = async (req, res) => {
    const { email, key } = req.body;
    const sql = 'SELECT * FROM users WHERE userEmail = ?';
    try {
        const [rows] = await pool.query(sql, [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(key, user.userKey);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        } else {
            req.session.user = {
                name: user.userName,
                email: user.userEmail
            }
            return res.status(200).json({ message: 'Login successful', user: req.session.user, success: true });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', Error: err.message, success: false });
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Error logging out' });
        res.status(200).json({ message: 'Logout successful', success: true });
    });
};

const isMe = async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ message: 'Not Logged In', success: false })
        res.status(200).json({ message: 'You are logged in', user: req.session.user, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error checking if logged in', Error: error.message, success: false })
    }
}

const protectedRoute = async (req, res) => {
    try {
        if (!req.session.user) return res.status(404).json({ message: 'Not Logged In', success: false })
        res.status(200).json({ message: 'You are logged in as: ' + req.session.user.name, success: true });
    } catch (error) {

    }
}

module.exports = {
    register,
    login,
    logout,
    isMe,
    protectedRoute
}