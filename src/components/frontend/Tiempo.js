import React, { useState, useContext } from 'react'; // Importar useContext aquí
import './css/Procesos.css';
import { Navigate } from 'react-router-dom';
import { FormDataContext } from './FormDataContext';
import axios from 'axios';


function Tiempo() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [monedaProyecto, setMonedaProyecto] = useState('');
  const [moneda, setMoneda] = useState('');
  const [presupuestoRango, setPresupuestoRango] = useState(''); // Valor inicial del rango de presupuesto
  const [comentarios, setComentarios] = useState('');
  const [redirect, setRedirect] = useState(false); // Nuevo estado para controlar la redirección
  const { updateFormData } = useContext(FormDataContext);

  const monedaSymbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',
    CAD: 'CAD$',
    AUD: 'AUD$',
    CHF: 'Fr.',
    INR: '₹',
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async(e) => {
    e.preventDefault();
     // Prepare the data to be sent in the request
     const formData = {
      fechaInicio,
      fechaFinalizacion,
      monedaProyecto,
      moneda,
      presupuestoRango,
      comentarios,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tiempo', formData);
      console.log('Data saved successfully');
      updateFormData('tiempo', formData);
      setRedirect(true);
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/comentarios" />;
  }

  return (
    <div className="form-containert">
      <h2 className="form-title">Formulario de tiempo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Fecha estimada de inicio de proyecto</label>
          <input
            type="date"
            className="date-input"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Fecha deseada de finalización</label>
          <input
            type="date"
            className="date-input"
            value={fechaFinalizacion}
            onChange={(e) => setFechaFinalizacion(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Moneda</label>
          <select
            className="date-inputo"
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
            required
          >
            <option value="">Seleccione una moneda</option>
            <option value="EUR">Euros (EUR)</option>
            <option value="USD">Dólares (USD)</option>
            <option value="GBP">Libras (GBP)</option>
            <option value="JPY">Yenes (JPY)</option>
            <option value="CAD">Dólares canadienses (CAD)</option>
            <option value="AUD">Dólares australianos (AUD)</option>
            <option value="CHF">Francos suizos (CHF)</option>
            <option value="INR">Rupias indias (INR)</option>
          
          </select>
        </div>
        <div className="form-field">
          <label>Presupuesto estimado</label>
          <select
            className="date-inputo"
            value={presupuestoRango}
            onChange={(e) => setPresupuestoRango(e.target.value)}
            required
          >
            <option value="">Seleccione un rango</option>
            <option value="500-1000">500 - 1000</option>
            <option value="1000-3000">1000 - 3000</option>
            <option value="3000-5000">3000 - 5000</option>
            <option value="5000-10000">5000 - 10000</option>
            <option value="10000+">Más de 10000</option>
          </select>
        </div>
        <button className="next-button" type="submit">
          Siguiente
        </button>
      </form>
    </div>
  );
}

export default Tiempo;