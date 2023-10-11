const jwt = require('jsonwebtoken');

const tokenSign = (uid) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        } );
    });
}


module.exports = {
    tokenSign
}
