
import React, { useState } from 'react';
import axios from 'axios';


function Comentarios() {
    const [comentario, setComentario] = useState('');
    const [mensajeEnviado, setMensajeEnviado] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); // Estado para rastrear el clic del botón

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonClicked(true); // Estado del clic del botón en true

        try {
            const response = await axios.post('http://localhost:5000/api/comentarios', { texto: comentario });
            console.log("Respuesta del servidor:", response);
            setMensajeEnviado(true); // Actualizar cuando se envía el comentario
            setComentario('');
            setTimeout(() => {
                setMensajeEnviado(false);
                setButtonClicked(false);
            }, 3000);
        } catch (error) {
            console.log("Error en el envío:", error);
            setMensajeEnviado(true); // Mostrar mensaje incluso en caso de error
        }
    };

    console.log("Estado del comentario:", comentario);
    console.log("Mensaje enviado:", mensajeEnviado);
    console.log("Botón clickeado:", buttonClicked);


    return (
        <div className="comentarios-container">
            <h2>Comentarios adicionales</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Escribe tu comentario aquí"
                        aria-label="Comentario"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Finalizar
                </button>
                {buttonClicked && mensajeEnviado && <p className="mensaje-confirmacion">¡Datos enviados correctamente!</p>}
            </form>
        </div>
    );
}

export default Comentarios;
