const mongoose = require('mongoose');

const TiempoSchema = new mongoose.Schema({
  fechaInicio: Date,
  fechaFinalizacion: Date,
  moneda: String,
  presupuestoRango: String,
});

module.exports = mongoose.model('Tiempo', TiempoSchema);
