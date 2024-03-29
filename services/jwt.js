'use strict'

var jwt = require('jwt-simple');
// Verificar fecha de autentificacion del token
var moment = require('moment');
var secret = 'clave_secreta_del_jwt';

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        epx: moment().add(30, 'days').unix
    }

    return jwt.encode(payload, secret);
}