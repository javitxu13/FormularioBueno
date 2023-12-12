import React, { useContext } from 'react';
import Slider from 'react-slick';
import { FormDataContext } from './FormDataContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Resumen = () => {
  // Access the formData object from the FormDataContext using useContext
  const { formData } = useContext(FormDataContext); // Make sure FormDataContext is properly set up in your app

  // Destructure and set default values for nested properties in formData
  const {
    infoBasica = {},
    herramientasSoftware = {},
    tiempo = {},
    processAutomation = {},
  } = formData;

  // Configuration settings for the Slider component
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Activar flechas de navegación
  };
  

  // Map and render selected software tools
  const renderSelectedSoftwareTools = () => {
    const { otrasHerramientas = {} } = herramientasSoftware;
    return Object.keys(otrasHerramientas)
      .filter((herramienta) => otrasHerramientas[herramienta])
      .map((herramienta) => <p key={herramienta}>{herramienta}</p>);
  };

  // Function to render the Horario section
  const renderHorario = () => {
    return (
      <div className='info'>
        <h3>Horario</h3>
        {tiempo && (
          <>
            <p>Fecha de Inicio: {tiempo.fechaInicio}</p>
            <p>Fecha de Finalización: {tiempo.fechaFinalizacion}</p>
            <p>Moneda del Proyecto: {tiempo.moneda}</p>
            <p>Presupuesto Estimado: {tiempo.presupuestoRango}</p>
          </>
        )}
      </div>
    );
  };

  // Function to render the Process Automation section
  const renderProcessAutomation = () => {
    const { procesosAgregados = [] } = processAutomation;
  
    // Comprueba si hay procesos agregados, si no, muestra un mensaje predeterminado.
    if (procesosAgregados.length === 0) {
      return (
        <div className='info'>
          <h3>Automatización de Procesos</h3>
          <p>No se han agregado procesos de automatización.</p>
        </div>
      );
    }

    return (
      <div className='padding'>
      <h3 className='title'>Automatización de Procesos</h3>
      <div className='procesos-container'>
      {procesosAgregados.map((proceso, index) => (
        <div className='proceso' key={index}>
          <h3>Proceso #{index + 1}</h3>
          <p>Nombre del proceso: {proceso.nombreProceso}</p>
          <p>Cantidad de personas que intervienen: {proceso.personasIntervienen}</p>
          <p>Tiempo estimado: {proceso.tiempoEstimado} horas</p>
          <div>
            <h4>Herramientas que intervienen</h4>
            <ul>
              {proceso.herramientasList.map((tool, toolIndex) => (
                <li key={toolIndex}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

  return (
    <div className="resumen-container">
    <h2 className="resumen-titulo">Resumen de Información</h2>
      <Slider {...settings}>
        <div className='info'>
          <h3>Info Básica</h3>
          <p>Nombre: {infoBasica.nombre}</p>
          <p>Correo Electrónico: {infoBasica.correoElectronico}</p>
          <p>Empresa: {infoBasica.empresa}</p>
          <p>Cargo: {infoBasica.cargo}</p>
          <p>Sector: {infoBasica.sector}</p>
          <p>Número de Empleados: {infoBasica.numeroEmpleados}</p>
          <p>Departamentos: {infoBasica.departamentos?.join(', ')}</p>
        </div>

        {/* Herramientas de Software Section */}
        <div className='info'>
          <h3>Herramientas de Software</h3>
          <p>¿Trabaja con ERP?: {herramientasSoftware.trabajaConERP}</p>
          <p>ERP Seleccionado: {herramientasSoftware.erpSeleccionado}</p>
          <p>¿Trabaja con CRM?: {herramientasSoftware.trabajaConCRM}</p>
          <p>CRM Seleccionado: {herramientasSoftware.crmSeleccionado}</p>
          <p>¿Trabaja con Suite de Productividad?: {herramientasSoftware.trabajaConSuite}</p>
          <p>Suite de Productividad: {herramientasSoftware.suiteSeleccionada}</p>
          {herramientasSoftware.suiteSeleccionada === 'Otro' && (
            <p>Suite Específica: {herramientasSoftware.suiteEspecifica}</p>
          )}
          <div>
            <h4>Otras Herramientas Seleccionadas</h4>
            {renderSelectedSoftwareTools()}
          </div>
        </div>

        {/* Process Automation Section */}
        {renderProcessAutomation()}

        {/* Horario Section */}
        {renderHorario()}
      </Slider>
    </div>
  );
};

export default Resumen;