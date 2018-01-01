'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas

// Convertir a objetos JSON los datos que nos llegan por http
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras http

// Rutas base

app.get('/', function (req, res) {
    res.status(200).send({ message: 'Bueno, funciona :V' });
});

module.exports = app;