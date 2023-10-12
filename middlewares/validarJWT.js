const handleHttpError = require('../helpers/handleError');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if(!token){
        return handleHttpError(res, {msg: 'No hay token en la petición'}, 401);
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(uid);
        if (!user) {
            return handleHttpError(res, {msg: 'Token no válido - usuario no existe en DB'}, 401);
        }

        if (!user.status) {
            return handleHttpError(res, {msg: 'Token no válido - usuario no confirmado'}, 401);
        }

        req.user = user;
    } catch (error) {
        console.log(error);
        return handleHttpError(res, {msg: 'Token no válido'}, 401);
    }

    next();

};

module.exports = validarJWT;