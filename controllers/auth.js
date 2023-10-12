const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../helpers/handlePassword')
const { tokenSign } = require('../helpers/handleJwt')
const handleHttpError = require('../helpers/handleError');
const { sendVerificationSMS, verifySmsTwilio} = require('../utils/smsTwilio');

const User = require('../models/user');

const register = async(req, res) => {
     try {

        req = matchedData(req);
        const password = await encrypt(req.password);
        // const opt = Math.floor(1000 + Math.random() * 9000);
        const opt = 1234;
        const body = {...req, password, opt};
        const dataUser = await User.create(body);

        const status = await sendVerificationSMS(dataUser.phone);
        console.log(status);

        const data = {
            ok: true,
            user: dataUser,
            status
        }

        res.status(201).send(data);

     } catch (error) {
        handleHttpError(res, {msg:'ERROR_REGISTER_USER', ok: false}, 400);
     }
};

const login = async(req, res) => {

    try {
        
        const user = await User.findOne({phone: req.body.phone});        
        
        if(!user) {
            return handleHttpError(res, {msg: 'No existe el usuario', ok: false}, 400);
        }

        if (!user.status) {
            return res.status(400).send({
                ok: false,
                message: 'Usuario sin confirmar',
            });
        }

        const hashPassword = user.get('password'); // Obtiene el password del usuario
        const checkPassword = await compare(req.body.password, hashPassword); // Compara el password ingresado con el password del usuario
        
        if(!checkPassword) {
            return handleHttpError(res, {msg: 'Error al validar credenciales', ok:false }, 400);
        }

        user.set({password: undefined}, {strict: false}); // Elimina el campo password del objeto
        const data = {
            ok: true,
            user,
            token: await tokenSign(user.id),
        }
        res.status(200).send(data);

    } catch(error) {
        console.log(error);
        handleHttpError(res, { msg: 'ERROR_LOGIN_USER', ok: false }, 400);
    }
};

const opt = async(req, res) => {

    try {

        const { phone } = req.body;

        const user = await User.findOne({phone});

        if (!user) {
            return handleHttpError(res, {msg: 'Usuario no encontrado', ok:false }, 400);
        }

        const opt = Math.floor(1000 + Math.random() * 9000)

        await User.findOneAndUpdate({phone}, {opt});

        const data = {
            ok: true,
            opt
        }
        res.status(200).send(data);
    } catch(error) {
        handleHttpError(res, { msg: 'ERROR_OPT_USER', ok: false }, 400);
    }

};

const confirmation = async(req, res) => {

    try {

        const user = await User.findOne({phone});

        if (!user) {
            return handleHttpError(res, {msg: 'Usuario no encontrado', ok:false }, 400);
        }

        let data = {};
        if (!user.status) {
            
            const status = await verifySmsTwilio(phone, code.toString());

            if (status !== 'approved') {
                return handleHttpError(res, {msg: 'Codigo incorrecto', ok:false }, 400);
            } 

            await User.findOneAndUpdate({phone}, {status: true, opt: 0});
            
            data = {
                ok: true,
                message: 'Usuario confirmado',
                token: await tokenSign(user.id),
                status
            }
           
        } else {
            data = {
                ok: true,
                message: 'Usuario ya confirmado',
                token: await tokenSign(user.id),
            }
        }

        res.status(200).send(data);


    } catch(error) {
        handleHttpError(res, { msg: 'ERROR_CONFIRMATION_USER', ok: false }, 400);
    }
}

module.exports = {
    register,
    login,
    opt,
    confirmation
};