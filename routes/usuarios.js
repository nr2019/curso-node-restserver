const { Router } = require('express');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost, usuariosPatch } = require('../controllers/usuarios');

const router = Router();


  router.get('/', usuariosGet);
  router.post('/', usuariosPost);
  //el :id se pone para indicar que espera un parámetro llamado id
  router.put('/:id', usuariosPut);
  router.patch('/', usuariosPatch);
  router.delete('/', usuariosDelete);


module.exports = router; 