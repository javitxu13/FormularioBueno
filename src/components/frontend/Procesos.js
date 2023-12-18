import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FormDataContext } from './FormDataContext';
import axios from 'axios';


function ProcessAutomationComponent() {
  const { formData, updateFormData } = useContext(FormDataContext);
  const { processAutomation = {} } = formData;
  const procesosAgregados = processAutomation.procesosAgregados || [];

  const [state, setState] = useState({
    currentStage: 1,
    nombreProceso: '',
    personasIntervienen: '',
    tiempoEstimado: '',
    herramientasIntervienen: '',
    editingIndex: null,
    showToolsInput: false,
    herramientasList: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleToolsInput = () => {
    setState((prevState) => ({
      ...prevState,
      showToolsInput: !prevState.showToolsInput,
    }));
  };

  const handleNext = async() => {
    try {
      const response = await axios.post('http://localhost:5000/api/processautomation', state);
   
      console.log('Data saved successfully');
    
    } catch (error) {
      console.error('Error saving data:', error.message);
    }

    setState((prevState) => ({
      ...prevState,
      currentStage: prevState.currentStage + 1,
    }));
  };

  const handleAddProcess = () => {
    const { nombreProceso, personasIntervienen, tiempoEstimado, herramientasList, herramientasIntervienen } = state;
  
    // Create a new process object with herramientasIntervienen if it's not empty
    const procesoActual = {
      nombreProceso,
      personasIntervienen,
      tiempoEstimado,
      herramientasList: [...herramientasList], // Copy the existing tools
    };
  
    if (herramientasIntervienen.trim() !== '') {
      procesoActual.herramientasList.push(herramientasIntervienen);
    }
  
    const updatedProcesosAgregados = [...procesosAgregados, procesoActual];
    updateFormData('processAutomation', { procesosAgregados: updatedProcesosAgregados });
  
    setState((prevState) => ({
      ...prevState,
      nombreProceso: '',
      personasIntervienen: '',
      tiempoEstimado: '',
      herramientasIntervienen: '', // Clear herramientasIntervienen
      herramientasList: [], // Clear herramientasList
    }));
  };
  
  

  const handleEdit = (index) => {
    const selectedProcess = procesosAgregados[index];
    setState({
      currentStage: 1,
      nombreProceso: selectedProcess.nombreProceso,
      personasIntervienen: selectedProcess.personasIntervienen,
      tiempoEstimado: selectedProcess.tiempoEstimado,
      herramientasIntervienen: '',
      editingIndex: index,
      herramientasList: selectedProcess.herramientasList,
    });
  };

  const handleSaveEdit = () => {
    const { nombreProceso, personasIntervienen, tiempoEstimado, herramientasList, editingIndex } = state;
    const updatedProcess = {
      nombreProceso,
      personasIntervienen,
      tiempoEstimado,
      herramientasList,
    };

    const updatedProcesosAgregados = [...procesosAgregados];
    updatedProcesosAgregados[editingIndex] = updatedProcess;

    updateFormData('processAutomation', { procesosAgregados: updatedProcesosAgregados });

    setState((prevState) => ({
      ...prevState,
      nombreProceso: '',
      personasIntervienen: '',
      tiempoEstimado: '',
      herramientasList: [],
      editingIndex: null,
    }));
  };

  const handleGuardarHerramienta = () => {
    const { herramientasIntervienen } = state;
    if (herramientasIntervienen.trim() !== '') {
      setState((prevState) => ({
        ...prevState,
        herramientasList: [...prevState.herramientasList, herramientasIntervienen],
        herramientasIntervienen: '',
        showToolsInput: false,
      }));
    }
  };

  const renderStage1Form = () => {
    const { nombreProceso, personasIntervienen, tiempoEstimado, herramientasIntervienen, showToolsInput, herramientasList } = state;

    return (
      <form className="form-containerProcesos" onSubmit={handleSubmit}>
        <h2 className="form-title">Formulario de Automatización de Procesos</h2>
        <p className='parrafo'>Este formulario le permite agregar los procesos que desee, ofreciendo una personalización completa para adaptarse a las necesidades específicas de su empresa y garantizar una integración eficiente.</p>
        <div className="form-field">
          <label htmlFor="nombreProceso">Nombre del proceso</label>
          <input
            type="text"
            name="nombreProceso"
            value={nombreProceso}
            onChange={handleChange}
            placeholder="Nombre del proceso"
          />
        </div>
        <div className="form-field">
          <label htmlFor="nombreProceso">Cantidad de personas que intervienen</label>
          <input
            className="date-input"
            type="number"
            name="personasIntervienen"
            value={personasIntervienen}
            onChange={handleChange}
            placeholder="Número de personas"
          />
        </div>
        <div className="form-field">
          <label htmlFor="nombreProceso">Tiempo estimado</label>
          <input
            className="date-input"
            type="number"
            name="tiempoEstimado"
            value={tiempoEstimado}
            onChange={handleChange}
            placeholder="Número estimado de horas"
          />
        </div>
        <div className="form-field tools-container">
          <div className="tools-header">
            <label>Herramientas que intervienen</label>
            <button className="toti" type="button" onClick={toggleToolsInput}>
              +
            </button>
          </div>
          {showToolsInput && (
            <div>
              <input
                className="tot"
                type="text"
                name="herramientasIntervienen"
                value={herramientasIntervienen}
                onChange={handleChange}
                placeholder="Añadir herramienta"
              />
              <div>
                <button className="tottis" type="button" onClick={toggleToolsInput}>
                  Cancelar
                </button>
                <button className="totti" type="button" onClick={handleGuardarHerramienta}>
                  Guardar
                </button>
              </div>
            </div>
          )}
        </div>
        {herramientasList.length > 0 && (
          <div className="added-tools">
            <p>Herramientas añadidas:</p>
            <ul>
              {herramientasList.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        )}
        {state.currentStage === 1 && (
          <div>
            <button type="button" className="next-button" onClick={handleAddProcess}>
              Añadir Proceso
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Siguiente
            </button>
          </div>
        )}
      </form>
    );
  };

  const renderProcesosTable = () => {
    const { editingIndex } = state;
  
    if (procesosAgregados.length === 0) {
      return null;
    }
  
    return (
      <div className="form-containero">
        <h2 className="form-title">Procesos Agregados:</h2>
        <table className="table">
          <thead className="thead">
            <tr className="trouble">
              <th>Nombre del Proceso</th>
              <th>Personas que Intervienen</th>
              <th>Tiempo Estimado</th>
              <th>Herramientas que Intervienen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {procesosAgregados.map((proceso, index) => (
              <tr key={index}>
                <td>
                  {index === editingIndex ? (
                    <input
                      className="nombres"
                      type="text"
                      name="nombreProceso"
                      value={state.nombreProceso}
                      onChange={handleChange}
                    />
                  ) : (
                    proceso.nombreProceso
                  )}
                </td>
                <td>
                  {index === editingIndex ? (
                    <input
                      className="nombre"
                      type="number"
                      name="personasIntervienen"
                      value={state.personasIntervienen}
                      onChange={handleChange}
                    />
                  ) : (
                    proceso.personasIntervienen
                  )}
                </td>
                <td>
                  {index === editingIndex ? (
                    <input
                      className="nombre"
                      type="number"
                      name="tiempoEstimado"
                      value={state.tiempoEstimado}
                      onChange={handleChange}
                    />
                  ) : (
                    proceso.tiempoEstimado
                  )}
                </td>
                <td>
                  {index === editingIndex ? (
                    <input
                      className="herr"
                      type="text"
                      name="herramientasIntervienen"
                      value={state.herramientasIntervienen}
                      onChange={handleChange}
                    />
                  ) : (
                    proceso.herramientasList.map((tool, toolIndex) => (
                      <div key={toolIndex}>
                        <ul>
                          <li>{tool}</li>
                        </ul>
                      </div>
                    ))
                  )}
                </td>
                <td>
                  {index === editingIndex ? (
                    <button className="next-butt" onClick={handleSaveEdit}>
                      Guardar
                    </button>
                  ) : (
                    <button className="next-butt" onClick={() => handleEdit(index)}>
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if needed.
  };

  const { currentStage } = state;

  if (currentStage === 2) {
    return <Navigate to="/presupuesto" />;
  }

  return (
    <div>
      {currentStage === 1 && renderStage1Form()}
      {renderProcesosTable()}
    </div>
  );
}

export default ProcessAutomationComponent;