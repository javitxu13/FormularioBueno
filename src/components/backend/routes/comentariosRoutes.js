const express = require('express');
const router = express.Router();
const { guardarComentarios } = require('../controllers/comentarioController');

// Route for saving comments
router.post('/api/comentarios', guardarComentarios);

module.exports = router;
