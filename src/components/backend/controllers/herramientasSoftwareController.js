const HerramientasSoftware = require('../models/HerramientasSoftwareModel');

const guardarHerramientasSoftware = async (req, res) => {
  try {
    const herramientas = new HerramientasSoftware(req.body);
    await herramientas.save();
    res.status(201).send(herramientas);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { guardarHerramientasSoftware };
