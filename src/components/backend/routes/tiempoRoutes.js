const express = require('express');
const router = express.Router();
const { guardarTiempo } = require('../controllers/tiempoController');

router.post('/api/tiempo', guardarTiempo);

module.exports = router;