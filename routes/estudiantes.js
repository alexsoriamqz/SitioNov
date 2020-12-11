var express = require('express');
var router = express.Router();

//Conectando con la base de datos
var mongoose = require('mongoose');
require('../models/modelEstudiante');
const Estudiante = mongoose.model('Estudiante'); //Referencia al modelo

/* Metodo GET me sirve para listar los registros. */
router.get('/', (req, res) => {
    //Metodo para buscar a todos los estudiantes
    Estudiante.find().then((estudiantes) => {
        res.json(estudiantes);
    }).catch((error)=> {
        if (error)
            throw error;
    });
});

//Encontrar un registro especificado de acuerdo al numero de control
router.get('/:numerocontrol', (req, res) => {
    Estudiante.findById(req.params.id).then((estudiantes) => {
        res.json(estudiantes);  //Solo registra un registro
    }).catch((error) => {
        if (error)
        throw error;
    });
});

//Metodo post agrega un estudiante
router.post('/', (req, res) => {
    
    console.log(req.body);

    //Almacenamos los datos en una variable newEstudiante
    //que son extraidos del cuerpo de la solicitud
    var newEstudiante = {
        NumeroControl: req.body.NumeroControl,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Edad: req.body.Edad,
        Email: req.body.Email
    }

    //Estudiante es el modelo y le pasamos los datos del newEstudiante
    var student = new Estudiante(newEstudiante);

    //Invocamos el metodo eliminar
    student.save().then(() => {
        console.log("El nuevo estudiante esta creado!!");
        res.send('Un nuevo estudiante fue creado exitosamente');
    }).catch((error) => {
        if (error) {
            console.log('Un error ha ocurrido al agregar un estudiante');
            throw error;
        }
    });
});

//Modifica un registro de estudiante
router.put('/', (req, res) => {
    //Utilizamos el motodo para verificar si existe en base el Email
    Estudiante.findOne({ NumeroControl: req.body.NumeroControl }).then((estudiantes) => {
        estudiantes.Nombre = req.body.Nombre;
        estudiantes.Apellidos = req.body.Apellidos;

        //Solamente modificamos el nombre y apellidos
        estudiantes.markModified('Nombre');
        estudiantes.markModified('Apellidos');

        estudiantes.save().then(() => {
            res.send("El estudiante ha sido modificado exitosamente!!");
        }).catch((error) => {
            if (error)
                throw error;
        });

    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Elimina un registro de estudiante
router.delete('/:numerocontrol', (req, res) => {
    
    Estudiante.findOneAndRemove(req.params.NumeroControl).then(() => {
        res.send("Se ha eliminano al estudiante exitosamente!!");
    }).catch((error) => {
        if(error)
            throw error;
    });
});
    

module.exports = router;