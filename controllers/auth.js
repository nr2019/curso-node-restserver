const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const {correo, password } = req.body;

    try {
        // Verificar si el mail existe
        // Acá yo ya sé que mi BD tiene una propiedad que se llama "correo"
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Correo'
            });
        }
        //Verificar si el usuario está activo en mi BD
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        //Verificar pass
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            });
        }
        //Generar el JWT
        const token = await generarJWT( usuario.id );
        
        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error. Contáctese con el administrador'
        })
    }
 
}

module.exports = {
    login
}