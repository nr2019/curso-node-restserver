const { response } = require('express');

const usuariosGet = (req, res = response) => {
    // res.status(403).json({
    // const query = req.query;
        // si no mandan nombre, le pone no name por default
    const { q, nombre = 'no name', apikey, page = 1, limit } = req.query;
    res.json({
        //ok: true,
        msg: 'Get API - Controlador',
        // query
        q,
        nombre, 
        apikey,
        page,
        limit
    });
};

const usuariosPost = (req, res) => {
    // res.status(403).json({

    // const body = req.body;
    const {nombre, edad} = req.body;

    res.status(201).json({
        //ok: true,
        msg: 'Post API - Controlador',
        // body
        nombre, 
        edad
    });
};

const usuariosPut = (req, res = response) => {
    // res.status(403).json({

    const id = req.params.id;

    res.status(400).json({
        //ok: true,
        msg: 'Put API - Controlador',
        id
    });
};


const usuariosPatch = (req, res) => {
    // res.status(403).json({
    res.json({
        //ok: true,
        msg: 'Patch API - Controlador'
    });
};

const usuariosDelete = (req, res) => {
    // res.status(403).json({
    res.json({
        //ok: true,
        msg: 'Delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
};