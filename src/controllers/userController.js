// src/controllers/userController.js
const User = require('../models/User');

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        res.status(500).json({ message: "Error creando usuario", error });
    }
};

// Obtener todos
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo usuarios", error });
    }
};
