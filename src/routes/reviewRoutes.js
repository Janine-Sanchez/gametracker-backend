const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Rutas específicas para obtener reseñas de un juego
router.get('/games/:gameId/reviews', reviewController.getReviewsByGameId); // GET /api/reseñas/juego/:gameId

// Rutas base para Reseñas
router.get('/', reviewController.getAllReviews); // GET /api/reseñas
router.post('/', reviewController.createReview); // POST /api/reseñas

// Rutas con ID
router.get('/:id', reviewController.getReviewsByGameId); // GET /api/reseñas/:id
router.put('/:id', reviewController.updateReview); // PUT /api/reseñas/:id
router.delete('/:id', reviewController.deleteReview); // DELETE /api/reseñas/:id

module.exports = router;
