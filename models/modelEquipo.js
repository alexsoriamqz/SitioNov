var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Equipo', {
    IdEquipo:{
        type: Schema.ObjectId,
        unique: true
    },
    ClaveEquipo:{
        type: Number,
        require: true,
        unique: true
    },
    Nombre:{
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    Entrenador:{
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    Ciudad:{
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    Pais:{
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    }

});