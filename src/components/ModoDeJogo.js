import React from 'react'
import './ModoDeJogo.css'

const ModoDeJogo = ({initGameFacil, initGamemedio,initGamedificil}) => {

  return (
    <div className='selectMode'>
      <h1>Escolha seu modo de jogo</h1>
      <br/>
      <button className='facil' onClick={initGameFacil}>Fácil</button>
      <br/>
      <button className='medio' onClick={initGamemedio}>médio</button>
      <br/>
      <button className='dificil' onClick={initGamedificil}>difícil</button>
      
    </div>
  )
}

export default ModoDeJogo