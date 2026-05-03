const { register, login, logout, isMe, protectedRoute } = require('../controllers/auth.cont');
const express = require('express')

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/isme', isMe)
router.get('/protected', protectedRoute)

module.exports = router;