const { register, retrieve } = require('../controllers/stockIn.cont');
const router = require('express').Router();

router.post('/register', register);
router.get('/retrieve', retrieve);

module.exports = router;