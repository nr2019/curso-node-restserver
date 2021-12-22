const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        console.log('uno');
        return res.status(401).json({
            msg: 'No se recibió token.'
        });
    }

    try {
        // Si el JWT no es válido, tira una excepción que se ataja en el catch
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Como en mi JWT ya se que viene el UID, lo extraigo y se lo paso a la request
        // creando una nueva propiedad en esta. Luego, los siguientes pasos del programa
        // Ya tendrán el UID leyendo la request
        // req.uid = uid;

        const _id = uid;
        // Leer el usuario que corresponde al UID
        // y almacenar el usuario en la req.usuario
        usuario = await Usuario.findById({ _id });

        if ( !usuario ) {
            console.log('dos');
            return res.status(401).json({
                msg: 'Token no válido - Usuario inexistente'
            });
        }

        // verificar si no está borrado
        if ( !usuario.estado) {
            console.log('tres');
            return res.status(401).json({
                msg: 'Token no válido - Estado = false'
            });
        }


        req.usuario = usuario;
                
        next();
    } catch (error) {
        console.log('cuatro');
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports ={
    
    validarJWT
}