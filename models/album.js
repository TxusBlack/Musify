var mongoose = require('mongoose');
// Definir schemas de la bd
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    title: String,
    description: String,
    year: String,
    image: String,
    artist: { type: Schema.ObjectId, ref: 'Artist' }
});

// Exportamos el modelo AlbumSchema con sus atributos por el objeto Album 
module.exports = mongoose.model('Album', AlbumSchema);