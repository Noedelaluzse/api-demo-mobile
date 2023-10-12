const { check } = require('express-validator');
const validateResults = require('../helpers/handleValidator');

const validatorRegister = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('phone', 'El email es obligatorio').isMobilePhone(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('gender', 'El email es obligatorio').not().isEmpty(),
    (req, res, next) => validateResults(req, res, next),
];

const validatorLogin = [
    check('phone', 'El email es obligatorio').isMobilePhone(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    (req, res, next) => validateResults(req, res, next),
];

const optValidator = [
    check('phone', 'El email es obligatorio').isMobilePhone(),
    (req, res, next) => validateResults(req, res, next),
];

const confirmationValidator = [
    check('phone', 'El telefono es obligatorio').isMobilePhone(),
    check('opt', 'El codigo es obligatorio').not().isEmpty(),
    (req, res, next) => validateResults(req, res, next),
];   

module.exports = {
    validatorRegister,
    validatorLogin,
    optValidator,
    confirmationValidator
}