const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
 
// Copia la URL del sitio de mongo DB
const MONGOURI = "mongodb+srv://test:test@cluster0.qaixa.mongodb.net/Microservices?retryWrites=true&w=majority";
                 
                 
const MongoServer = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        });
        console.log("Conectado a la Base de Datos !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};
 
module.exports = MongoServer;