import { useState, useEffect } from 'react';
import './App.css';
import data from './preguntas.json';

function App() {
  const [datos, setDatos] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaCorrectas, setRespuestaCorrectas] = useState(0);
  const [respuestaIncorrectas, setRespuestaIncorrectas] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [terminado, setTerminado] = useState(false); // 👈 nuevo estado

  useEffect(() => {
    setDatos(data);
  }, []);

  const siguientePregunta = (resp) => {
    if (resp === datos[indiceActual].resCorrecta) {
      setRespuestaCorrectas(respuestaCorrectas + 1);
    } else {
      setRespuestaIncorrectas(respuestaIncorrectas + 1);
    }

    if (indiceActual === datos.length - 1) {
      setTerminado(true); 
    } else {
      setIndiceActual(indiceActual + 1);
    }

    setRespuestaSeleccionada(null);
  };

  const preguntaActual = datos[indiceActual];

  return (
    <div className="app">
      {!terminado && preguntaActual && (
        <div className="cont-question">
          <h1>{preguntaActual.pregunta}</h1>
          <div className="cont-responses">
            {preguntaActual.respuestas.map((resp, i) => {
              const estilo = {
                backgroundColor: respuestaSeleccionada === i ? 'rgba(87, 0, 83, 1)' : 'rgba(217, 0, 224, 1)'
              };

              return (
                <div style={estilo}onClick={() => {
                    setRespuestaSeleccionada(i);
                    siguientePregunta(resp);}}key={i}>{resp}</div>
              );
            })}
          </div>
        </div>
      )}

      {terminado && (
        <div className="resultados">
          <h2>¡Resultados!</h2>
          <p> Correctas: {respuestaCorrectas}</p>
          <p> Incorrectas: {respuestaIncorrectas}</p>
        </div>
      )}
    </div>
  );
}

export default App;
