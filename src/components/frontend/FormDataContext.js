import React, { createContext, useState } from 'react';

// Initialize the context with a default value
const defaultFormData = {
  infoBasica: {},
  herramientasSoftware: {
    otrasHerramientas: {},
  },
  processAutomation: {
    procesosAgregados: [],
  },
  tiempo: {}, // Puedes agregar más información aquí si es necesario
};


// Create the context
export const FormDataContext = createContext({
  formData: defaultFormData,
  updateFormData: () => {},
});

// Create the provider
export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);

  // Define the updateFormData function
  const updateFormData = (formName, newData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formName]: {
        ...prevFormData[formName],
        ...newData,
      },
    }));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
