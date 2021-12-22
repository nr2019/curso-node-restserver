const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a DB
        this.conectarDB();

 
        // Middlewares
        this.middlewares();

        //Lectura y parseo del body
        this.app.use( express.json() );

        // Rutas de mi aplicación
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // el USE hace que sea un middleware

        //CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use( express.static('public'));
        
    }

    routes() {
       this.app.use(this.authPath, require('../routes/auth'));
       this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() { 
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
}

module.exports = Server;