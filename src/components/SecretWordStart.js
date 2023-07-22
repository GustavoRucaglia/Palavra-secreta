import React from 'react'
import "./SecretWordStart.css"
const SecretWordStart = ({selectGame}) => {
  return (
    <div className='start'>
          <h1>Palavra secreta</h1>
          <button onClick={selectGame}>Começar jogo</button>
          
     </div>
  )
}

export default SecretWordStart