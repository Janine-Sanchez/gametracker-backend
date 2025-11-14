// src/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    required: true
  },
  plataforma: {
    type: String,
    required: true
  },
  añoLanzamiento: {
    type: Number,
    required: true
  },
  desarrollador: {
    type: String,
    required: true
  },
  imagenPortada: {
    type: String, // URL de la imagen
    required: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  completado: {
    type: Boolean,
    default: false // Se asume que no está completado por defecto
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);
