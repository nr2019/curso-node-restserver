const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') =>{
    
    return new Promise((resolve, reject) => {
        // acá podría poner muchas cosas, { uid, teléfono, mail, etc } pero me lo pueden robar, por eso no se realiza el envío de datos sensibles en el JWT
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token ) => {
            if (err) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            } else{
                resolve( token );
            }
        });
    });

};

module.exports = {
    generarJWT
};