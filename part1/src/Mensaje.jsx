import React from "react"

const Mensaje = (params) => {
  return (
    <div>
      <h1>Esto es un mensaje</h1>
      <p>{params.mensaje}</p>
    </div>
  )
}

export default Mensaje
