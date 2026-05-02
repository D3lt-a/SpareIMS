const { register, retrieve } = require('../controllers/sparePart.cont')
const express = require('express');

const router = express.Router();

router.post('/register', register);
router.get('/retrieve', retrieve);

module.exports = router;