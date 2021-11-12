
require('dotenv').config();
const Server = require('./models/server');
const server = new Server();
 
// Con esta instrucción levanto el server
server.listen();