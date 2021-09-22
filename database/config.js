const mongoose = require('mongoose');


const dbConnection = async() => {

    try{
        console.log('Init DB config');
        await mongoose.connect( process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el Admin')
    }

}


module.exports = {
    dbConnection
}