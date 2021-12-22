const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost, usuariosPatch } = require('../controllers/usuarios');
const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();


  router.get('/', usuariosGet);
  //el :id se pone para indicar que espera un parámetro llamado id
  router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), // Esta validación está en helpers y me asegura que el ID excista
    check('rol').custom( esRoleValido ),// al validarlo acá, me obliga a que lo manen en la modificación
    validarCampos
  ], 
  usuariosPut);
  // Cada check es un middleware en el cual indicamos que campo del body necesito revisar
  router.post('/',[
                  check('nombre','El nombre es obligatório').not().isEmpty(),
                  check('password','El password debe posee más de 6 caracteres').isLength({min: 6}),
                  check('correo','El correo no es válido.').isEmail(),
                  check('correo').custom( emailExiste ),
                  //check('rol','El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
                  check('rol').custom( esRoleValido ), 
                  validarCampos
                ], 
              usuariosPost);
 
  
  router.patch('/', usuariosPatch);
  router.delete('/:id',[
    
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), // Esta validación está en helpers y me asegura que el ID excista
    // check('rol').custom( esRoleValido ),// al validarlo acá, me obliga a que lo manen en la modificación
    validarCampos
  ], 
  usuariosDelete);


module.exports = router; 