const mongoose = require('mongoose');

const HerramientasSoftwareSchema = new mongoose.Schema({
  trabajaConERP: String,
  erpSeleccionado: String,
  trabajaConCRM: String,
  crmSeleccionado: String,
  trabajaConSuite: String,
  suiteSeleccionada: String,
  suiteEspecifica: String,
  otrasHerramientas: Map
});

module.exports = mongoose.model('HerramientasSoftware', HerramientasSoftwareSchema);
