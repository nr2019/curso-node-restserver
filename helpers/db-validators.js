const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async( rol = '' ) =>{
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

 // Verificar si el correo existe
// const existeEmail = await Usuario.findOne({correo: correo});
// La expresión anterior en JS es redundante. con sólo mandar el correo 1 vez, alcanza

const emailExiste =  async( correo = '' ) =>{
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
      // return res.status(400).json({
      //     msdg: 'El correo ya existe en BD'
      // });
      throw new Error(`El correo ${ correo } ya está registrado en la BD`)
  }
}

const existeUsuarioPorId =  async( id ) =>{
  const existeUsuario = await Usuario.findById( id );
  if (!existeUsuario) {
      // return res.status(400).json({
      //     msdg: 'El correo ya existe en BD'
      // });
      throw new Error(`El id ${ id } no existe en la BD`)
  }
}
  module.exports = {
      esRoleValido,
      emailExiste,
      existeUsuarioPorId
  }