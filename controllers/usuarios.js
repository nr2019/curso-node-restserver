const { response } = require('express');
const bcryptjs = require('bcryptjs');
// El Usuario me va a permitir crearme instancias de mi modelo. la U mayúscula es por estándar
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {

    // En el request recibo un parámetro que se llama LIMITE. desestructuro el request
    // y obtengo el valor necesarios. si no viene nada, pongo 5 como default
    // OJO! El parámetro llega como string y limit espera un número, hay que castearlo
    const { limite = 6, desde = 0 } = req.query;
    const query =  { estado:true } ;

    // Se ejecutan las 2 consultas secuencialmente. cuando termina una, arranca la otra
    // // const usuarios = await Usuario.find({ estado:true })
    // const usuarios = await Usuario.find(query)
    //                 .skip(Number(desde))
    //                 .limit(Number(limite));
   
    // // const total = await Usuario.countDocuments({ estado:true });
    // const total = await Usuario.countDocuments(query);
    
    // Se ejecutan las 2 promesas simultaneamente
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
    ])
    
    res.json({
        total,
        usuarios
        
    });
};

const usuariosPost = async(req, res) => {



    const {nombre, correo, password, rol} = req.body;
        
    // Como mi modelo ya está definido, si en el body mandan un campo nuevo o erróneo, 
    // mongoose interpreta y hace que lo saltée. Sólo me quedo con lo que definí en models/usuario
    // const usuario = new Usuario( body );
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // // Verificar si el correo existe
    // // const existeEmail = await Usuario.findOne({correo: correo});
    // // La expresión anterior en JS es redundante. con sólo mandar el correo 1 vez, alcanza
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msdg: 'El correo ya existe en BD'
    //     });
    // }

    
    // Encriptar la contraseña
    // los salts son las vueltas de encriptación. por defecto viene en 10. Si le pones más, es más seguro pero tarda más
    const salt = bcryptjs.genSaltSync();
    // El hashsync encripta en una sola vía
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        //ok: true,
        // msg: 'Post API - Controlador',
        usuario
        //body
        // nombre, 
        // edad
    });
};

const usuariosPut = async(req, res = response) => {
    // res.status(403).json({

    const id = req.params.id;
    // Excluyo lo que no voy a actualizar (_id (si es que viene), password, google, correo) y me quedo 
    // con RESTO, que es lo que si voy a actualizar
    const { _id, password, google, correo, ...resto} = req.body;

    // ToDo validar contra base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        // El hashsync encripta en una sola vía
        resto.password = bcryptjs.hashSync(password, salt);
    }

    // Busca por ID y actualiza todo lo que está en RESTO
    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.status(400).json(usuario);
};
 

const usuariosPatch = (req, res) => {
    // res.status(403).json({
    res.json({
        //ok: true,
        msg: 'Patch API - Controlador'
    });
};


const usuariosDelete = async(req, res = response) => {
    
    const { id } = req.params;

    // // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete( id );


    // const uid = req.uid;

    // obtener usuario autenticado
    const usuLogueado = req.usuario;
    if (!usuLogueado) {
        console.log('seis');
        res.status(401).json({
            msg: 'Usuario no autenticado'
        });
    }

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false });
    
    // se imprime el usuario autenticado
    res.json({
        usuario,
         usuLogueado
        // uid
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
};