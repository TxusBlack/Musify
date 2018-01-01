// Usar las ultimas funciones de JS
'user strict'
// Cargamos mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
// Hacemos conexion a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('La base de datos está corriendo perfectamente...');

        app.listen(port, function () {
            console.log("Servidor del api escuchando en http://localhost:" + port);
        });
    }
});