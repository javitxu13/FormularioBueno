const express = require('express');
const router = express.Router();
const { guardarInfoBasica } = require('../controllers/infoBasicaController');

router.post('/api/infobasica', guardarInfoBasica);

module.exports = router;