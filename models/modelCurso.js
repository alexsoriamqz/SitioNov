var mongoose = require('mongoose');

//definimos 
mongoose.model('Curso',{
    ClaveCurso:{
        type: Number,
        require: [true, 'Se requiere una clave del Curso'],
        unique: true
    },
    Materia: {
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    Grado: {
        type: Number,
        require: true,
        min: 1,
        max: 6
    },
    Profesor: {
        type: String,
        require: true,
        minleght: 3
    },
    NumeroAlumnos: {
        type: Number,
        require: true,
        min: 4,
        max: 26
    }
    
});

//module.exports = mongoose.Schema('cliente',clienteSchema);