const Comentario = require('../models/Comentario');

const guardarComentarios = async (req, res) => {
  try {
    // Create a new comment using the Comentario model
    const comentario = new Comentario(req.body);
    await comentario.save();
    res.status(201).send(comentario);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { guardarComentarios };
