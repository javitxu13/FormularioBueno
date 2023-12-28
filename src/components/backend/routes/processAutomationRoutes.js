const express = require('express');
const router = express.Router();
const ProcessAutomation = require('../models/ProcessAutomation'); // Asumiendo que este es tu modelo
const processAutomationController = require('../controllers/processAutomationController');

// POST route to save a new process automation
router.post('/api/processautomation', processAutomationController.guardarProcessAutomation);

// DELETE route to delete an existing process automation
router.delete('/api/processautomation/:id', async (req, res) => {
    try {
        const processId = req.params.id;
        const deletedProcess = await ProcessAutomation.findByIdAndDelete(processId);

        if (!deletedProcess) {
            return res.status(404).json({ message: 'Proceso no encontrado' });
        }

        res.status(200).json({ message: 'Proceso eliminado con éxito', deletedProcess });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
});

module.exports = router;
