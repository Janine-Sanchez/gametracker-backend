// src/controllers/gameController.js
const Game = require('../models/Game');

// Crear un nuevo juego
exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json({ message: "Juego creado", game });
    } catch (error) {
        res.status(500).json({ message: "Error creando juego", error });
    }
};

// Obtener todos los juegos
exports.getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo juegos", error });
    }
};
