const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../helpers/handlePassword')
const { tokenSign } = require('../helpers/handleJwt')
const handleHttpError = require('../helpers/handleError');
const User = require('../models/user');

const register = async(req, res) => {
     try {

        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await User.create(body);
        
        dataUser.set({password: undefined}, {strict: false}); // Elimina el campo password del objeto

        const data = {
            ok: true,
            user: dataUser,
            token: tokenSign(dataUser.id),
        }

        res.send({data});

     } catch (error) {
        handleHttpError(res, 'ERROR_REGISTER_USER', 400);
     }
};

module.exports = {
    register
};