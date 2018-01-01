'use strict'
var mongoose = require('mongoose');
// Definir schemas de la bd
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

// Exportamos el modelo UserSchema con sus atributos por el objeto User 
module.exports = mongoose.model('User', UserSchema);