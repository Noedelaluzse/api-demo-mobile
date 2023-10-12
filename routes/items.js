const { Router } = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/items');
const { validatorCreateItem, validatorGetItem } = require('../validators/items');
const validarJWT = require('../middlewares/validarJWT');

const router = Router();

router.get('/', validarJWT, getItems);
router.get('/:id',validarJWT, validatorGetItem, getItem);
router.post('/', validarJWT,validatorCreateItem, createItem);
router.put('/:id', validarJWT, validatorGetItem, updateItem);
router.delete('/:id', validarJWT, validatorGetItem, deleteItem);

module.exports = router