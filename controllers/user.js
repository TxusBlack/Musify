'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando una accion del controlador del usuario'
	});
}

// req = post, res = get
function saveUser(req, res) {

	// Creamos un objeto del modelo de usuario
	var user = new User();

	// Convertimos el cuerpo del request en una var
	var params = req.body;

	console.log(params);

	// Traemos los datos del request y los guardamos en el objeto del modelo del user
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_USER';
	user.image = 'null';

	// Encriptamos la contraseña
	if (params.password) {
		bcrypt.hash(params.password, null, null, function (err, hash) {
			user.password = hash;
			if (user.name != null && user.surname != null && user.email != null) {
				// Guarde el usuario
				user.save((err, userStored) => {
					if (err) {
						res.status(500).send({message: 'Error al guardar el usuario'});
					} else {
						if (!userStored) {
							res.status(404).send({message: 'No se ha registrado el usuario'});
						} else {
							res.status(200).send({ user: userStored });
						}
					}
				});
			} else {
				res.status(200).send({message: 'Rellena todos los campos'});
			}
		});
	} else {
		res.status(500).send({message: 'Introduce la contraseña'});
	}
}

module.exports = {
	pruebas,
	saveUser
};