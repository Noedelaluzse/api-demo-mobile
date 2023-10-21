const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { uploadFile } = require("../helpers/handleUploadFile");
const handleHttpError = require('../helpers/handleError');
const { User } = require('../models');


const loadFile = async (req, res = response) => {
    
    const { id } = req.params;

    const user = await User.findById(id);
    
    if (!user) {
        return handleHttpError(res, {msg: 'ERROR_USER_NOT_FOUND', ok: false}, 400);
    }

    // Limpiamos imagenes previas
    if (user.img) {
        const arrName = user.img.split('/');
        const name = arrName[arrName.length - 1];
        const [public_id] = name.split('.');
        await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    
    if (!tempFilePath) {
        return handleHttpError(res, {msg: 'ERROR_FILE_NOT_FOUND', ok: false}, 400);
    }

    try {
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    
        user.img = secure_url;
        await user.save();
        res.status(200).send({msg: 'Imagen cargada correctamente', ok: true, user});
    
    } catch (error) {
        return handleHttpError(res, {msg: 'ERROR_UPLOAD_FILE', ok: false}, 400);
    }
}


module.exports = {
    loadFile
};