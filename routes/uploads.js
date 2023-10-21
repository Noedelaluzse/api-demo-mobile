const { Router } = require('express');
const { loadFile } = require('../controllers/uploads');
const { validatorGetItem } = require('../validators/items');
const router = Router();

router.put('/:id', validatorGetItem, loadFile);

module.exports = router;