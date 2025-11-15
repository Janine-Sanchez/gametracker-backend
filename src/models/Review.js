const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game',
        required: true,
    },
    puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
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
        enum: ['Fácil', 'Normal', 'Difícil'],
    },
    recomendaria: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: 'fechaCreacion',
        updatedAt: 'fechaActualizacion'
    }
});


module.exports = mongoose.model('Review', ReviewSchema);