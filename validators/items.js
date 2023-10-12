const { check } = require('express-validator');
const validateResults = require('../helpers/handleValidator');

const validatorCreateItem = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('coordinates', 'Las coordenadas son obligatorias').not().isEmpty(),
    check('coordinates.latitude', 'La latitud es obligatoria').not().isEmpty(),
    check('coordinates.longitude', 'La longitud es obligatoria').not().isEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    check('id', 'El id es obligatorio').not().isEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = {
    validatorCreateItem,
    validatorGetItem,
}