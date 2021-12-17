const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) =>{
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores);
    }    
    // si pasó las validaciones, el next le indica que siga con el siguiente middleware
    next();
}

module.exports = {
    validarCampos
} 