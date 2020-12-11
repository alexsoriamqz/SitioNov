var express = require('express');
var router = express.Router();

//Conectando con la base de datos
var mongoose = require('mongoose');
require('../models/modelEquipo');
const Equipo = mongoose.model('Equipo'); //Referencia al modelo

/* Metodo GET me sirve para listar los equipos. */
router.get('/', (req, res) => {
    //Metodo para buscar a todos los equipos
    Equipo.find().then((equipo) => {
        res.json(equipo);
    }).catch((error)=> {
        if (error)
            throw error;
    });
});

//Encontrar un registro especificado de acuerdo a la clave del equipo
router.get('/:claveequipo', (req, res) => {
    let ClaveEquipo = req.params.claveequipo;

    Equipo.findOne({ClaveEquipo}).then((equipo) => {
        res.json(equipo);  //Solo registra un registro
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
    var newEquipo = {
        ClaveEquipo: req.body.ClaveEquipo,
        Nombre: req.body.Nombre,
        Entrenador: req.body.Entrenador,
        Ciudad: req.body.Ciudad,
        Pais: req.body.Pais
    }

    //Estudiante es el modelo y le pasamos los datos del newEstudiante
    var team = new Equipo(newEquipo);

    //Invocamos el metodo eliminar
    team.save().then(() => {
        console.log("El nuevo equipo esta creado!!");
        res.send('Un nuevo equipo fue creado exitosamente');
    }).catch((error) => {
        if (error) {
            console.log('Un error ha ocurrido al agregar un equipo');
            throw error;
        }
    });
});

//Modifica un registro de un equipo
router.put('/', (req, res) => {
    //Utilizamos el motodo para verificar si existe en base el equipo
    Equipo.findOne({ ClaveEquipo: req.body.ClaveEquipo }).then((equipo) => {
        equipo.Nombre = req.body.Nombre;
        equipo.Entrenador = req.body.Entrenador;

        //Solamente modificamos el nombre y entrenador
        equipo.markModified('Nombre');
        equipo.markModified('Entrenador');

        equipo.save().then(() => {
            res.send("El equipo ha sido modificado exitosamente!!");
        }).catch((error) => {
            if (error)
                throw error;
        });

    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Elimina un registro de un equipo
router.delete('/:claveequipo', (req, res) => {
    let ClaveEquipo = req.params.claveequipo;
    
    Equipo.findOneAndRemove({ClaveEquipo}).then((equipo) => {
        res.json(equipo);  //Solo registra un registro
    }).catch((error) => {
        if(error)
            throw error;
    });
});

    

module.exports = router;