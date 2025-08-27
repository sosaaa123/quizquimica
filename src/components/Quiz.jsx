import { useState, useEffect } from "react"
import "../App.css"
import data from "../preguntas.json"
import { Howl } from "howler"
import ReactHowler from "react-howler"
import { Link } from "react-router-dom"
function Quiz() {
  const [datos, setDatos] = useState([])
  const [indiceActual, setIndiceActual] = useState(0)
  const [respuestaCorrectas, setRespuestaCorrectas] = useState(0)
  const [respuestaIncorrectas, setRespuestaIncorrectas] = useState(0)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null)
  const [terminado, setTerminado] = useState(false)

  const [fColor, setFColor] = useState("#93c277")
  const colores = [
    "#98addf",
    "#2bb3c8",
    "#cd98f5",
    "#6da5d8",
    "#d0e3b2",
    "#ffb159",
    "#ff6961",
    "#92C7F0",
    "#A9CC3B",
  ]

  const click = new Howl({ src: ["click.wav"], volume: 2 })

  const handleClick = () => {
    click.play()
  }

  useEffect(() => {
    setDatos(data)
  }, [])

  const siguientePregunta = (resp) => {
    if (resp === datos[indiceActual].resCorrecta) {
      setRespuestaCorrectas(respuestaCorrectas + 1)
    } else {
      setRespuestaIncorrectas(respuestaIncorrectas + 1)
    }

    if (indiceActual === datos.length - 1) {
      setTerminado(true)
    } else {
      setIndiceActual(indiceActual + 1)
      setFColor(colores[Math.floor(Math.random() * colores.length)])
    }

    setRespuestaSeleccionada(null)
  }

  const preguntaActual = datos[indiceActual]

  return (
    <div className="app" style={{ backgroundColor: fColor }}>
      {!terminado && preguntaActual && (
        <div className="cont-question">
          <h1>{preguntaActual.pregunta}</h1>
          <div className="cont-responses" onClick={handleClick}>
            {preguntaActual.respuestas.map((resp, i) => (
              <div
                className="resp"
                onClick={() => {
                  setRespuestaSeleccionada(i)
                  siguientePregunta(resp)
                }}
                key={i}
                style={{ color: fColor, backgroundColor: "white" }}
              >
                {resp}
              </div>
            ))}
          </div>
        </div>
      )}

      {terminado && (
        <div className="resultados">
          <h1>¡Resultados!</h1>
          {respuestaCorrectas > respuestaIncorrectas ? (
            <>
              <ReactHowler src="final2.wav" playing={true} volume={2.5} />
              <h2 style={{ color: "green" }}>Ganaste</h2>
            </>
          ) : (
            <>
              <ReactHowler src="perdiste.mp3" playing={true} volume={2.5} />
              <h2 style={{ color: "red" }}>Perdiste</h2>
            </>
          )}

          <div>
            <p>Correctas: {respuestaCorrectas} ✅</p>
            <p>Incorrectas: {respuestaIncorrectas}❌</p>
          </div>

          <div className="reintentar">
            <Link to={"/"} style={{ backgroundColor: fColor }}>
              Reintentar
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
