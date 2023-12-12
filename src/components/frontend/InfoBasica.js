import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './css/Procesos.css';
import { FormDataContext } from './FormDataContext';
import axios from 'axios'; 

class InfoBasica extends Component {
  static contextType = FormDataContext;

  constructor(props) {
    super(props);
    this.state = {
      etapa: 1,
      nombre: '',
      empresa: '',
      cargo: '',
      correoElectronico: '',
      sector: '',
      numeroEmpleados: '',
      departamentos: [],
      departamentosAdicionales: [],
      mostrarFormularioExtra: false,
      nuevoDepartamento: '',
    };
  }


  handleNext = async (e) => {
  e.preventDefault();
  // Actualizar el contexto aquí
  const { updateFormData } = this.context;
  updateFormData('infoBasica', this.state);
  try {
    const response = await axios.post('http://localhost:5000/api/infobasica', this.state);
 
    console.log('Data saved successfully');
  
  } catch (error) {
    console.error('Error saving data:', error.message);
  }

  this.setState({ etapa: 2 });
}

  // Maneja los cambios en los campos del formulario
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  

  toggleDepartmentSelection = (department) => {
    this.setState((prevState) => {
      const newDepartments = new Set(prevState.departamentos);
      if (newDepartments.has(department)) {
        newDepartments.delete(department);
        if (department === 'Otro') {
          return { departamentos: Array.from(newDepartments), mostrarFormularioExtra: false };
        }
      } else {
        newDepartments.add(department);
        if (department === 'Otro') {
          return { departamentos: Array.from(newDepartments), mostrarFormularioExtra: true };
        }
      }
      return { departamentos: Array.from(newDepartments) };
    });
  }

  handleNuevoDepartamentoChange = (e) => {
    this.setState({ nuevoDepartamento: e.target.value });
  }

  agregarNuevoDepartamento = () => {
    const { nuevoDepartamento, departamentosAdicionales } = this.state;
    if (nuevoDepartamento && !departamentosAdicionales.includes(nuevoDepartamento)) {
      this.setState((prevState) => ({
        departamentosAdicionales: [...prevState.departamentosAdicionales, nuevoDepartamento],
        // No agregues el nuevo departamento a la lista de departamentos seleccionados
        nuevoDepartamento: '',
        mostrarFormularioExtra: false,
      }));
    }
  }
  

  renderExtraForm() {
    if (this.state.mostrarFormularioExtra) {
      return (
        <div className="extra-form">
          <input
            type="text"
            value={this.state.nuevoDepartamento}
            onChange={this.handleNuevoDepartamentoChange}
            placeholder="Nuevo Departamento"
          />
          <button className='agregar' onClick={this.agregarNuevoDepartamento}>Agregar</button>
        </div>
      );
    }
    return null;
  }

  renderDepartmentButtons() {
    const { departamentos, departamentosAdicionales } = this.state;
    let allDepartments = ["Finanzas", "Marketing", "Diseño", "Ventas", "Tecnología", "Logística", "Innovación", "Comunicación", "Investigación", ...departamentosAdicionales];
  
    // Asegurarse de que "Otro" siempre esté al final
    allDepartments = allDepartments.filter(dept => dept !== "Otro");
    allDepartments.push("Otro");
  
    return (
      <div className="department-buttons">
        {allDepartments.map((dept) => (
          <button
            key={dept}
            className={`department-button ${departamentos.includes(dept) ? 'selected' : ''} ${dept === 'Otro' ? 'other-department' : ''}`}
            type="button"
            onClick={() => this.toggleDepartmentSelection(dept)}
          >
            {dept}
          </button>
        ))}
      </div>
    );
  }
  

  renderEtapa1Form() {
    const { nombre, empresa, cargo, correoElectronico, sector, numeroEmpleados } = this.state;

    const sectores = ["Tecnología", "Finanzas", "Educación", "Salud", "Manufactura", "Retail", "Turismo", "Otro"];


    return (
      <form className="form-container" onSubmit={this.handleNext}>
        <h2 className="form-title">Formulario de Información Básica</h2>
  
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={this.handleChange}
            placeholder="Nombre"
          />
        </div>

        <div className="form-field">
          <label htmlFor="correoElectronico">Correo Electrónico</label>
          <input
            type="email"
            name="correoElectronico"
            id="correoElectronico"
            className="email"
            value={correoElectronico}
            onChange={this.handleChange}
            placeholder="Correo Electrónico"
          />
        </div>
  
        <div className="form-field">
          <label htmlFor="empresa">Empresa</label>
          <input
            type="text"
            name="empresa"
            id="empresa"
            value={empresa}
            onChange={this.handleChange}
            placeholder="Empresa"
          />
        </div>
  
        <div className="form-field">
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            name="cargo"
            id="cargo"
            value={cargo}
            onChange={this.handleChange}
            placeholder="Cargo"
          />
        </div>
  
    
  
        <div className="form-field">
        <label htmlFor="sector">Sector</label>
        <select
          className='sector'
          name="sector"
          id="sector"
          value={sector}
          onChange={this.handleChange}
        >
          <option value="">Seleccione un sector</option>
          {sectores.map((sectorOption, index) => (
            <option key={index} value={sectorOption}>{sectorOption}</option>
          ))}
        </select>
      </div>

  
        <div className="form-field">
          <label htmlFor="numeroEmpleados">Número de Empleados</label>
          <input
            className="email"
            type="number"
            name="numeroEmpleados"
            id="numeroEmpleados"
            value={numeroEmpleados}
            onChange={this.handleChange}
            placeholder="Número de Empleados"
          />
        </div>
  
        <div className="form-field">
          <label className='fff'>Departamentos</label>
          {this.renderDepartmentButtons()}
        </div>
  
        {this.renderExtraForm()} {/* Renderiza el formulario extra si es necesario */}
  
        <button className="next-button" type="submit">Siguiente</button>
      </form>
    );
  }


  render() {
    const { etapa } = this.state;

    if (etapa === 2) {
      return <Navigate to="/herramientas-software" />;
    }
    
 return (
      <div>
        {etapa === 1 && this.renderEtapa1Form()}
      </div>
    );
  }
}

export default InfoBasica;