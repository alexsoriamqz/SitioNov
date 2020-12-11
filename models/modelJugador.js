var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Jugador', {
    IdJugador:{
        type: Schema.ObjectId,
        unique: true
    },
    ClaveJugador:{
        type: Number,
        require: true,
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
    Nacionalidad:{
        type: String,
        require: true,
        lowercase: true,
        minleght: 3
    },
    FechaNac:{
        type: Date,
        require: true
    }

});