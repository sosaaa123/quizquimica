import { Link } from "react-router-dom"
import { useState } from "react"

import { Howl } from "howler"

function Inicio() {
  const click = new Howl({ src: ["/click.wav"], volume: 2 })

  const handleClick = () => {
    click.play()
  }

  return (
    <>
      <div className="start">
        <Link to={"/Quiz"} onClick={handleClick}>
          <i class="fa-solid fa-play"></i>
        </Link>
        <h2>Comenzar</h2>
      </div>
    </>
  )
}

export default Inicio
