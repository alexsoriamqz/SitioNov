var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Jugador = mongoose.model('Jugador');
const Equipo = mongoose.model('Equipo');

mongoose.model('JugadorEquipo', {
    IdJugador:{
        type: Schema.ObjectId,
        ref: "Jugador",
        unique: true
    },
    IdEquipo:{
        type: Schema.ObjectId,
        ref: "Equipo",
        unique: true
    },
    NumeroCamisa:{
        type: Number,
        require: [true, 'Se requiere un numero de camiseta'],
        unique: true
    },
    Goles:{
        type: Number,
        require: true
    },
    Partidos:{
        type: Number,
        require: true
    }

});