const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {

    try {
        validationResult(req).throw();
        next(); // Continua hacia el controlador
    } catch (err) {
        res.status(403)
        res.send({erros: err.array()});
    }
}  

module.exports = validateResults;