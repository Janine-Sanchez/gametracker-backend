const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); // Importa el modelo de juego

// Ruta para agregar un nuevo juego (POST)
router.post('/', async (req, res) => {
  const { titulo, genero, plataforma, añoLanzamiento, desarrollador, imagenPortada, descripcion, completado } = req.body;

  try {
    // Crear un nuevo juego
    const newGame = new Game({
      titulo,
      genero,
      plataforma,
      añoLanzamiento,
      desarrollador,
      imagenPortada,
      descripcion,
      completado
    });

    // Guardar el juego en la base de datos
    await newGame.save();

    // Enviar la respuesta con el juego creado
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error al agregar el juego:', error);
    res.status(500).json({ message: 'Error al agregar el juego' });
  }
});

// Ruta para obtener todos los juegos (GET)
router.get('/', async (req, res) => {
  try {
    const games = await Game.find(); // Obtiene todos los juegos de la base de datos
    res.json(games); // Envía la lista de juegos en formato JSON
  } catch (error) {
    console.error('Error al obtener los juegos', error);
    res.status(500).json({ message: 'Error al obtener los juegos' });
  }
});

module.exports = router;
