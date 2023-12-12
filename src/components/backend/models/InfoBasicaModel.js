const mongoose = require('mongoose');

const InfoBasicaSchema = new mongoose.Schema({
  nombre: String,
  empresa: String,
  cargo: String,
  correoElectronico: String,
  sector: String,
  numeroEmpleados: Number,
  departamentos: [String],
  departamentosAdicionales: [String]
});

module.exports = mongoose.model('InfoBasica', InfoBasicaSchema);
