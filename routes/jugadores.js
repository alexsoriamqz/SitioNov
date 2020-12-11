var express = require('express');
var router = express.Router();

//Conectando con la base de datos
var mongoose = require('mongoose');
require('../models/modelJugador');
const Jugador = mongoose.model('Jugador'); //Referencia al modelo

/* Metodo GET me sirve para listar los jugadores. */
router.get('/', (req, res) => {
    //Metodo para buscar a todos los estudiantes
    Jugador.find().then((jugador) => {
        res.json(jugador);
    }).catch((error)=> {
        if (error)
            throw error;
    });
});

//Encontrar un registro especificado de acuerdo al numero del jugador
router.get('/:clavejugador', (req, res) => {
    let ClaveJugador = req.params.clavejugador;

    Jugador.findOne({ClaveJugador}).then((jugador) => {
        res.json(jugador);  //Solo registra un registro
    }).catch((error) => {
        if (error)
        throw error;
    });
});


//Metodo post agrega un jugador
router.post('/', (req, res) => {
    
    console.log(req.body);

    //Almacenamos los datos en una variable newJugador
    //que son extraidos del cuerpo de la solicitud
    var newJugador = {
        ClaveJugador: req.body.ClaveJugador,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Nacionalidad: req.body.Nacionalidad,
        FechaNac: req.body.FechaNac
    }

    //Estudiante es el modelo y le pasamos los datos del newRegistro
    var player = new Jugador(newJugador);

    //Invocamos el metodo insertar
    player.save().then(() => {
        console.log("El nuevo jugador esta creado!!");
        res.send('Un nuevo jugador fue creado exitosamente');
    }).catch((error) => {
        if (error) {
            console.log('Un error ha ocurrido al agregar un jugador');
            throw error;
        }
    });
});

//Modifica un registro de un jugador
router.put('/', (req, res) => {
    //Utilizamos el motodo para verificar si existe en base el numero de jugador
    Jugador.findOne({ ClaveJugador: req.body.ClaveJugador}).then((jugador) => {
        jugador.Nombre = req.body.Nombre;
        jugador.Apellidos = req.body.Apellidos;

        //Solamente modificamos el nombre y apellidos
        jugador.markModified('Nombre');
        jugador.markModified('Apellidos');

        jugador.save().then(() => {
            res.send("El jugador ha sido modificado exitosamente!!");
        }).catch((error) => {
            if (error)
                throw error;
        });

    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Elimina un registro de un jugador
router.delete('/:clavejugador', (req, res) => {
    let ClaveJugador = req.params.clavejugador;
    
    Jugador.findOneAndRemove({ClaveJugador}).then((jugador) => {
        res.json(jugador);  //Solo registra un registro
    }).catch((error) => {
        if(error)
            throw error;
    });
});

    

module.exports = router;