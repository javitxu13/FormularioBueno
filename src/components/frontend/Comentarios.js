import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Comentarios() {
    const [comentario, setComentario] = useState('');
    const [redirigir, setRedirigir] = useState(false); // Estado para controlar la redirección

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRedirigir(true); // Activa la redirección inmediatamente

        // Opcional: envía el comentario al servidor
        try {
            await axios.post('http://localhost:5000/api/comentarios', { texto: comentario });
            console.log("Comentario enviado");
        } catch (error) {
            console.log("Error en el envío:", error);
        }
    };

    // Si redirigir es true, navegar a la página de confirmación
    if (redirigir) {
        return <Navigate to="/confirmacion" replace={true} />;
    }

    return (
        <div className="comentarios-container">
            <h2 className='adicionales'>Comentarios adicionales</h2>
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
            </form>
        </div>
    );
}

export default Comentarios;
