const ProcessAutomation = require('../models/ProcessAutomation');

const guardarProcessAutomation = async (req, res) => {
  try {
    // Suponiendo que tienes un identificador único, como un ID de empresa o usuario
    const uniqueId = req.body.uniqueId;
    let processAutomation = await ProcessAutomation.findOne({ uniqueId });

    if (processAutomation) {
      // Actualiza la lista existente de procesos
      processAutomation.procesosAgregados = req.body.procesosAgregados;
    } else {
      // Crea un nuevo documento si no existe
      processAutomation = new ProcessAutomation({
        uniqueId,
        procesosAgregados: req.body.procesosAgregados,
      });
    }

    await processAutomation.save();
    res.status(201).send(processAutomation);
  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(400).send(error);
  }
};

module.exports = { guardarProcessAutomation };
