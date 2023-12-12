const express = require('express');
const router = express.Router();
const { guardarProcessAutomation } = require('../controllers/processAutomationController');

router.post('/api/processautomation', guardarProcessAutomation);

module.exports = router;