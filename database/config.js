const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
        
       await mongoose.connect( process.env.MONGODB_CNN, {
           useNewUrlParser: true,
           useUnifiedTopology: true
        //    useCreateIndex: true, " Mongo ya no los soporta
        //    useFindAndModify: false " Mongo ya no los soporta
       } );

       console.log('Base de datos ON LINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
};

module.exports = {
    dbConnection
}
