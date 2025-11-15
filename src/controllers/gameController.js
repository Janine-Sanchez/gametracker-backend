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

// Obtener un juego por su ID
exports.getGameById = async (req, res) => {
    const { id } = req.params;
    try {
        const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo el juego", error });
    }
};

// Actualizar la información de un juego
exports.updateGame = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).json({ message: "Juego no encontrado para actualizar" });
        }
        res.json(updatedGame);
    } catch (error) {
        res.status(500).json({ message: "Error actualizando el juego", error });
    }
};

// Eliminar un juego
exports.deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGame = await Game.findByIdAndDelete(id);
        if (!deletedGame) {
            return res.status(404).json({ message: "Juego no encontrado para eliminar" });
        }
        res.json({ message: "Juego eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando el juego", error });
    }
};
