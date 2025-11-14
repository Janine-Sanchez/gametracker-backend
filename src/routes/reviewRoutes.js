const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Rutas base para Reseñas
router.get('/', reviewController.getAllReviews); // GET /api/reseñas
router.post('/', reviewController.createReview); // POST /api/reseñas

// Rutas con ID
router.get('/:id', reviewController.getReviewsByGameId); // GET /api/reseñas/juego/:juegoId
router.put('/:id', reviewController.updateReview); // PUT /api/reseñas/:id
router.delete('/:id', reviewController.deleteReview); // DELETE /api/reseñas/:id

// IMPORTANTE: El endpoint GET /api/reseñas/juego/:juegoId
// Usé el ID de la reseña en las rutas PUT y DELETE,
// por lo que este endpoint específico debe colocarse en un lugar que no choque.

// Una forma de manejar el endpoint específico:
// 1. Si quieres mantener la estructura /api/reseñas/juego/:juegoId
//    - Asegúrate de que esta ruta se defina ANTES de las rutas con :id, 
//      para que "juego" no se interprete como un ID.
// 2. Si prefieres no arriesgarte a colisiones:
//    - Podrías renombrarla a /api/reseñas-por-juego/:juegoId (más seguro)

// Asumiendo que prefieres mantener tu estructura, definimos la ruta de búsqueda ANTES del resto de rutas con parámetros:
router.get('/juego/:juegoId', reviewController.getReviewsByGameId); // GET /api/reseñas/juego/:juegoId

// Reorganizando las rutas para evitar colisiones (MÉTODO RECOMENDADO):
// router.get('/', reviewController.getAllReviews);
// router.post('/', reviewController.createReview);
// router.get('/juego/:juegoId', reviewController.getReviewsByGameId); // Ruta específica
// router.put('/:id', reviewController.updateReview);
// router.delete('/:id', reviewController.deleteReview);

module.exports = router;