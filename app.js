'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/user');

// Convertir a objetos JSON los datos que nos llegan por http
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras http

// Rutas base

// Middleware para la api
app.use('/api', user_routes);

module.exports = app;