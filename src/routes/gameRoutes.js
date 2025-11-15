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
    res.status(201).json({ message: "Juego creado", game: newGame });
  } catch (error) {
    console.error('Error al agregar el juego:', error);
    res.status(500).json({ message: 'Error al agregar el juego', error });
  }
});

// Ruta para obtener todos los juegos (GET)
router.get('/', async (req, res) => {
  try {
    const games = await Game.find(); // Obtiene todos los juegos de la base de datos
    res.json(games); // Envía la lista de juegos en formato JSON
  } catch (error) {
    console.error('Error al obtener los juegos', error);
    res.status(500).json({ message: 'Error al obtener los juegos', error });
  }
});

// Ruta para obtener un juego específico por su ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);  // Busca un juego por su ID
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(game);  // Envía el juego encontrado
  } catch (error) {
    console.error('Error al obtener el juego', error);
    res.status(500).json({ message: 'Error al obtener el juego', error });
  }
});

// Ruta para actualizar la información de un juego (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, genero, plataforma, añoLanzamiento, desarrollador, imagenPortada, descripcion, completado } = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(id, {
      titulo,
      genero,
      plataforma,
      añoLanzamiento,
      desarrollador,
      imagenPortada,
      descripcion,
      completado
    }, { new: true });  // Actualiza el juego y devuelve el juego actualizado
    if (!updatedGame) {
      return res.status(404).json({ message: 'Juego no encontrado para actualizar' });
    }
    res.json(updatedGame);  // Devuelve el juego actualizado
  } catch (error) {
    console.error('Error al actualizar el juego', error);
    res.status(500).json({ message: 'Error al actualizar el juego', error });
  }
});

// Ruta para eliminar un juego (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await Game.findByIdAndDelete(id);  // Elimina el juego por su ID
    if (!deletedGame) {
      return res.status(404).json({ message: 'Juego no encontrado para eliminar' });
    }
    res.json({ message: 'Juego eliminado con éxito' });  // Confirma que el juego ha sido eliminado
  } catch (error) {
    console.error('Error al eliminar el juego', error);
    res.status(500).json({ message: 'Error al eliminar el juego', error });
  }
});

module.exports = router;
