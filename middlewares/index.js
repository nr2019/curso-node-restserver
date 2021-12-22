const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos, // Agregando el ... hace que exporte todo lo que exporta el middleware sin nombrarlos uno a uno
    ...validarJWT,
    ...validarRoles 
}