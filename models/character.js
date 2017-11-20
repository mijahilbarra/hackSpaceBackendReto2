'use strict'

//Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

//Definición del esquema
var characterSchema = new Schema({
	name: {type: String, required: true/*, unique: true*/},
	surName: {type: String, required: true},
	age: {type: Number, required: true},
	behavior: {type: String, required: true},
	img: {type: String, required: true},
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('Character', characterSchema)