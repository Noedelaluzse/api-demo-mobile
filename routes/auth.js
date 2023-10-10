const { Router } = require('express');
const { validatorLogin } = require('../validators/auth');
const { register } = require('../controllers/auth');

const router = Router();

router.post('/login', validatorLogin, register);

module.exports = router;