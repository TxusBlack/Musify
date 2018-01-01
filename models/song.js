var mongoose = require('mongoose');
// Definir schemas de la bd
var Schema = mongoose.Schema;

var SongSchema = new Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album' }
});

// Exportamos el modelo SongSchema con sus atributos por el objeto Song 
module.exports = mongoose.model('Song', SongSchema);