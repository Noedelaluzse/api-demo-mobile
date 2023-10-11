const { Router } = require('express');
const { validatorLogin, validatorRegister, optValidator } = require('../validators/auth');
const { register, login, opt, confirmation } = require('../controllers/auth');

const router = Router();

router.post('/register', validatorRegister, register);
router.post('/login', validatorLogin, login);
router.post('/opt', optValidator, opt)
router.post('/confirmation', optValidator, confirmation)


module.exports = router;