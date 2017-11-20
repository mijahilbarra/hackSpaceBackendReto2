'use strict'

// REQUERIMIENTO DE MODULOS

	var express =  require('express');
	var swig = require('swig');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');
	var bcrypt = require('bcryptjs');

//CONFIGURACIONES

	// Creación del servidor web con express
	var server = express();

	// Integracion del motor de templates swig
	server.engine('html',swig.renderFile);
	server.set('view engine', 'html');
	server.set('views', __dirname + '/views');
	swig.setDefaults({cache: false});

	// Seteo de dirección de carpeta de archivos estaticos
	server.use(express.static(__dirname + '/public'));

// CONFIGURACIONES DB

	// Integración de mongoose
	mongoose.connect('mongodb://localhost/hackspace', { useMongoClient: true });
	mongoose.Promise = global.Promise;

	// Requerimiento de modelo Character
	var Character = require('./models/character'); 


	// Integración de body parser
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());

// PETICIONES
	// Peticion post del formulario
	server.post('/formulario/',function(req,res){
		// Regitro de informacion del formulario
		var name = req.body.name;
		var surName = req.body.surName;
		var age = req.body.age;
		var behavior= req.body.behavior;
		var img=req.body.img;
		var Character = require('./models/character'); 
		// Creacion de una nueva instancia del modelo character
		var Character = new Character({ 
			name: name, 
			surName: surName, 
			age: age,
			behavior: behavior,
			img: img
		});

		// Guardar el usuario creado

		Character.save(function(err){
			// Aseguramiento de no errores
			if( err ){
				console.log(err);
			} else {
				// Redireccion a home
				res.redirect('/');
			}
		
		})

	});

	// Cuando exista una petición en el servidor  
	server.get('/',function(req,res){

		// Consulta al modelo Character en la base de datos.		 
		Character.find()
		.then( function(Character) {
			res.render('especialidades.html', {  Character:Character  });
		})
	});

	// Petición get del formulario
	server.get('/formulario/',function(req,res){

		Character.find()
		.then( function(Character) {
			res.render('formulario.html', {  Character:Character  });
		})
	});



// INICIAR SERVIDOR

	// Se corre el servidor en el puerto 8000
	server.listen(8000, function() {
		console.log('El servidor esta escuchando en el puerto '+ 8000)
	});