const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
