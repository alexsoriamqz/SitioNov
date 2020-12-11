var express = require('express');
var router = express.Router();

/* Metodo GET me sirve para listar los registros. */
router.get('/', (req, res) => {
    res.send('Metodo que lista los cursos');
});

//Encontrar un registro especificado
router.get('/:clavecurso', (req, res) => {
    res.send('Encuentra un curso ' + req.params.clavecurso);
});

//Metodo post agrega un curso
router.post('/', (req, res) => {
    //res.send('Agregando un registro de curso');
    res.json(req.body);
    console.log(req.body);
});

//Modifica un registro de un curso
router.put('/', (req, res) => {
    res.send('Modificando un registro');
});

//Modifica un registro de curso
router.delete('/:clavecurso', (req, res) => {
    res.send('Eliminando un registro de un curso' + req.params.clavecurso);
});

module.exports = router;