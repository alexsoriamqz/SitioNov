var express = require('express');
var router = express.Router();

//Conectando con la base de datos
var mongoose = require('mongoose');
require('../models/modelJugadorEquipo');
const Registro = mongoose.model('JugadorEquipo'); //Referencia al modelo

/* Metodo GET me sirve para listar los registros. */
router.get('/', (req, res) => {
    //Metodo para buscar a todos los registros
    Registro.find().then((registro) => {
        res.json(registro);
    }).catch((error)=> {
        if (error)
            throw error;
    });
});

//Encontrar un registro especificado de acuerdo al numero de registro
router.get('/:numerocamisa', (req, res) => {
    let NumeroCamisa = req.params.numerocamisa;

    Registro.findOne({NumeroCamisa}).then((registro) => {
        res.json(registro);  //Solo registra un registro
    }).catch((error) => {
        if (error)
        throw error;
    });
});



//Metodo post agrega un registro
router.post('/', (req, res) => {
    
    console.log(req.body);

    //Almacenamos los datos en una variable newRegistro
    //que son extraidos del cuerpo de la solicitud
    var newRegistro = {
        IdJugador: req.body.IdJugador,
        IdEquipo: req.body.IdEquipo,
        NumeroCamisa: req.body.NumeroCamisa,
        Goles: req.body.Goles,
        Partidos: req.body.Partidos
    }

    //Estudiante es el modelo y le pasamos los datos del newRegistro
    var register = new Registro(newRegistro);

    //Invocamos el metodo eliminar
    register.save().then(() => {
        console.log("El nuevo registro esta creado!!");
        res.send('Un nuevo registro fue creado exitosamente');
    }).catch((error) => {
        if (error) {
            console.log('Un error ha ocurrido al agregar un registro');
            throw error;
        }
    });
});

//Modifica un registro de un registro
router.put('/', (req, res) => {
    //Utilizamos el motodo para verificar si existe en base el numero de registro
    Registro.findOne({ NumeroCamisa: req.body.NumeroCamisa }).then((registro) => {
        registro.Goles = req.body.Goles;
        registro.Partidos = req.body.Partidos;

        //Solamente modificamos los goles y los partidos
        registro.markModified('Goles');
        registro.markModified('Partidos');

        registro.save().then(() => {
            res.send("El registro ha sido modificado exitosamente!!");
        }).catch((error) => {
            if (error)
                throw error;
        });

    }).catch((error) => {
        if (error)
            throw error;
    });
});

//Elimina un registro
router.delete('/:numerocamisa', (req, res) => {
    let NumeroCamisa = req.params.numerocamisa;
    
    Registro.findOneAndRemove({NumeroCamisa}).then((registro) => {
        res.json(registro);  //Solo registra un registro
    }).catch((error) => {
        if(error)
            throw error;
    });
});
    

module.exports = router;