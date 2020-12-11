var mongoose = require('mongoose');

//definimos 
mongoose.model('Estudiante',{
    NumeroControl:{
        type: Number,
        require: [true, 'Se requiere un numero de control'],
        unique: true
    },
    Nombre: {
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    Apellidos: {
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    Edad: {
        type: Number,
        require: true,
        min: 10,
        max: 120
    },
    Email: {
        type: String,
        require: true,
        unique: true
    }
});

//module.exports = mongoose.Schema('cliente',clienteSchema);