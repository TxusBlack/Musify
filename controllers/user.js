'use strict'

// Acceder a ficheros
var fs = require('fs');
// Acceder a los path de los archivos
var path = require('path');

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function pruebas(req, res) {
	res.status(200).send({
		message: 'Probando una accion del controlador del usuario :V'
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
	user.role = 'ROLE_ADMIN';
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

function loginUser(req, res) {
	// Parsearlo a JSON
	var params = req.body;

	var email = params.email;
	var password = params.password;

	// findOne es un tipo de query
	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		} else {
			if (!user) {
				res.status(404).send({message: 'El usuario no existe'});
			} else {
				// Comprobar la contraseña
				bcrypt.compare(password, user.password, (err, check) => {
					if (check) {
						// Devolver los datos del user logueado
						if (params.gethash) {
							// Devolver un token de jwt
							res.status(200).send({ token: jwt.createToken(user) });
						} else {
							res.status(200).send({ user });
						}
					} else {
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
					}
				});
			}
		}
	});

}

function updateUser(req, res) {
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if (err) {
			res.status(500).send({ message: 'Error al actualizar el usuario' });
		} else {
			if (!userUpdated) {
				res.status(400).send({ message: 'No se ha podido actualizar el usuario' });
			} else {
				res.status(200).send({ user: userUpdated });
			}
		}
	});
}

function uploadImage(req, res) {
	var userId = req.params.id;
	var file_name = 'Imagen no subida...';

	if (req.files) {
		// Conseguir el nombre de la imagen
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		// Extension
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'png') {
			User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
				if (!userUpdated) {
					res.status(400).send({ message: 'No se ha podido actualizar la imagen' });
				} else {
					res.status(200).send({ user: userUpdated });
				}
			})
		} else {
			res.status(200).send({ message: 'Tipo de archivo no permitido' });
		}

		console.log(ext_split);
	} else {
		res.status(200).send({ message: 'No has subido ninguna imagen' });
	}
}

function getImageFile(req, res) {
	// Sacar de la bd el nombre de la imagen
	var image_file = req.params.imageFile;
	var path_file = './uploads/users/' + image_file;

	// Comprobar si existe el fichero en el servidor
	fs.exists(path_file, (exists) => {
		if (exists) {
			res.sendFile(path.resolve(path_file));
		} else {
			res.status(200).send({ message: 'No existe la imagen' });
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};