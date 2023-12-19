const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');

require('dotenv').config(); // Asegúrate de que esto está en la parte superior

// Rutas
const infoBasicaRoutes = require('./src/components/backend/routes/infoBasicaRoutes');
const herramientasSoftwareRoutes = require('./src/components/backend/routes/herramientasSoftwareRoutes');
const processAutomationRoutes = require('./src/components/backend/routes/processAutomationRoutes');
const tiempoRoutes = require('./src/components/backend/routes/tiempoRoutes');
const comentariosRoutes = require('./src/components/backend/routes/comentariosRoutes');

const app = express();

app.use(express.json())
app.use(cors())

// Conexión a MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bimetrick");

    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Detiene la aplicación en caso de error de conexión
  }
};

connectToMongoDB();
// Middleware para manejo de errores
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});


// Rutas de la API
app.post('/api/infobasica', infoBasicaRoutes);
app.post('/api/herramientassoftware', herramientasSoftwareRoutes);
app.post('/api/processautomation', processAutomationRoutes);
app.post('/api/tiempo', tiempoRoutes);
app.post('/api/comentarios', comentariosRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});