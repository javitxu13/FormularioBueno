const ProcessAutomation = require('../models/ProcessAutomationModel');

// const guardarProcessAutomation = async (req, res) => {
//   try {
//     const data = new ProcessAutomation(req.body);
//     await data.save();
//     res.status(201).send(data);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

const guardarProcessAutomation = async (req, res) => {
  try {
    const { nombreProceso, personasIntervienen, tiempoEstimado, herramientasList } = req.body;

    const processAutomation = new ProcessAutomation({
      procesosAgregados: [{
        nombreProceso,
        personasIntervienen: Number(personasIntervienen),
        tiempoEstimado: Number(tiempoEstimado),
        herramientasList: Array.isArray(herramientasList) ? herramientasList : [herramientasList],
      }],
    });

    await processAutomation.save();
    res.status(201).send(processAutomation);
  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(400).send(error);
  }
};


module.exports = { guardarProcessAutomation };