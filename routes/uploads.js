const { Router } = require('express');
const { loadFile } = require('../controllers/uploads');
const router = Router();

router.put('/:id', loadFile);

module.exports = router;