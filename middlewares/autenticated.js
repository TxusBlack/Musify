'use strict'

var jwt = require('jwt-simple');
// Verificar fecha de autentificacion del token
var moment = require('moment');
var secret = 'clave_secreta_del_jwt';

// Comprobar si los datos del token son correctos
exports.ensureAuth = function (req, res, next) {
    // Si el header authorization existe
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }

    // Quitar las comillas iniciales con las que viene el token
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' });
        }
    } catch(ex) {
        // console.log(ex);
        return res.status(404).send({ message: 'Token no es válido' });
    }

    // Devolver en la request todos los datos del usuario que vino por el payload
    req.user = payload;

    // Salir del middleware
    next();
}