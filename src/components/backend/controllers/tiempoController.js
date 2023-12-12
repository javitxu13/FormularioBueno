const Tiempo = require('../models/TiempoModel');

const guardarTiempo = async (req, res) => {
  try {
    const tiempo = new Tiempo(req.body);
    await tiempo.save();
    res.status(201).send(tiempo);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { guardarTiempo };
