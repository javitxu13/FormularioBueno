import React, { useState } from 'react';
import InfoBasica from './InfoBasica';
import HerramientasSoftware from './HerramientasSoftware';
import ProcessAutomationComponent from './ProcessAutomationComponent';
import Tiempo from './Tiempo';

const FormSlider = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const forms = [<InfoBasica />, <HerramientasSoftware />, <ProcessAutomationComponent />, <Tiempo />];

  const goToNextForm = () => {
    if (activeFormIndex < forms.length - 1) {
      setActiveFormIndex(activeFormIndex + 1);
    }
  };

  const goToPreviousForm = () => {
    if (activeFormIndex > 0) {
      setActiveFormIndex(activeFormIndex - 1);
    }
  };

  return (
    <div>
      {forms[activeFormIndex]}
      {activeFormIndex > 0 && (
        <button onClick={goToPreviousForm}>Anterior</button>
      )}
      {activeFormIndex < forms.length - 1 && (
        <button onClick={goToNextForm}>Siguiente</button>
      )}
    </div>
  );
};

export default FormSlider;
