const { check } = require('express-validator');
const validateResults = require('../helpers/handleValidator');

const validatorRegister = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('phone', 'El email es obligatorio').isMobilePhone(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('gender', 'El email es obligatorio').not().isEmpty(),
    validateResults
];

const validatorLogin = [
    check('phone', 'El email es obligatorio').isMobilePhone(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateResults
];

module.exports = {
    validatorRegister,
    validatorLogin
}