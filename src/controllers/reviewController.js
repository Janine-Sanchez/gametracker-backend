const Review = require('../models/Review'); // Asegúrate de que la ruta sea correcta

// 1. GET /api/reseñas - Obtener todas tus reseñas
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('juegoId'); // Opcional: Popular el juego
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. GET /api/reseñas/juego/:gameId - Reseñas de un juego específico
exports.getReviewsByGameId = async (req, res) => {
    try {
        // Buscar reseñas para el juego específico usando gameId (solo el _id del juego)
        const reviews = await Review.find({ juegoId: req.params.gameId }).populate('juegoId');
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No se encontraron reseñas para este juego.' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. POST /api/reseñas - Escribir nueva reseña
exports.createReview = async (req, res) => {
    const { juegoId, puntuacion, textoReseña, horasJugadas, dificultad, recomendaria } = req.body;

    // Validar que juegoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
        return res.status(400).json({ message: 'El juegoId no es válido' });
    }

    // Crear una nueva reseña con los datos recibidos
    const newReview = new Review({
        juegoId,         // Asegúrate de que juegoId sea solo el ObjectId del juego
        puntuacion,
        textoReseña,
        horasJugadas,
        dificultad,
        recomendaria
    });

    try {
        const savedReview = await newReview.save();
        res.status(201).json(savedReview); // Enviar la nueva reseña creada
    } catch (error) {
        res.status(400).json({ message: error.message }); // Mongoose maneja errores de validación
    }
};

// 4. PUT /api/reseñas/:id - Actualizar reseña existente
exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // {new: true} retorna el documento actualizado; {runValidators: true} ejecuta validaciones
        ).populate('juegoId');

        if (!updatedReview) {
            return res.status(404).json({ message: 'Reseña no encontrada.' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 5. DELETE /api/reseñas/:id - Eliminar reseña
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Reseña no encontrada.' });
        }

        // 204 No Content es una respuesta estándar para borrado exitoso sin cuerpo de respuesta
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
