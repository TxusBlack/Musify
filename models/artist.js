'use strict'
var mongoose = require('mongoose');
// Definir schemas de la bd
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: String,
    description: String,
    image: String
});

// Exportamos el modelo ArtistSchema con sus atributos por el objeto Artist 
module.exports = mongoose.model('Artist', ArtistSchema);