const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    juegoId: {
        // Campo clave: Referencia al ID de un Juego
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game', // Asegúrate de que este sea el nombre del modelo de Juego
        required: true,
    },
    puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Puntuación de 1 a 5 estrellas
    },
    textoReseña: {
        type: String,
        trim: true,
        required: true,
    },
    horasJugadas: {
        type: Number,
        default: 0,
        min: 0,
    },
    dificultad: {
        type: String,
        enum: ['Fácil', 'Normal', 'Difícil'], // Opcional: Define opciones fijas
    },
    recomendaria: {
        type: Boolean,
        default: false,
    },
}, {
    // Añade automáticamente createdAt y updatedAt
    timestamps: {
        createdAt: 'fechaCreacion',
        updatedAt: 'fechaActualizacion'
    }
});

// Exportar el modelo
module.exports = mongoose.model('Review', ReviewSchema);