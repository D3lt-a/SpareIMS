const express = require('express')
const { register, retrieve, edit, remove } = require('../controllers/stockOut.cont');

const router = express.Router();

router.post('/register', register)
router.get('/retrieve', retrieve)
router.put('/edit/:id', edit)
router.delete('/remove/:id', remove)

module.exports = router;