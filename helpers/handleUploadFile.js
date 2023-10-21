const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameSplit = file.name.split('.');
        const extension = nameSplit[nameSplit.length - 1];

        // Validar la extensión
        if (!validExtensions.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${validExtensions}`);
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(tempName);
        });
    });


};

module.exports = {
    uploadFile
};