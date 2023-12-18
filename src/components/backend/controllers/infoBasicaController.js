const InfoBasica = require('../models/InfoBasicaModel');


const guardarInfoBasica = async (req, res) => {
  try {
    const info = new InfoBasica(req.body);
    await info.save();
    res.status(201).send(info);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { guardarInfoBasica };
