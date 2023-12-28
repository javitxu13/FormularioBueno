const mongoose = require('mongoose');

const ProcesoSchema = new mongoose.Schema({
  nombreProceso: String,
  personasIntervienen: Number,
  tiempoEstimado: Number,
  herramientasList: [String]
});

const ProcessAutomationSchema = new mongoose.Schema({
  procesosAgregados: [ProcesoSchema]
});

module.exports = mongoose.model('ProcessAutomation', ProcessAutomationSchema);
