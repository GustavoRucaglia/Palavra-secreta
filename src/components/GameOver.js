import "./GameOver.css"

const GameOver = ({retry}) => {

  //frases de game over

  const arr = ["Perdeu", "boa sorte na proxima", "Game Over", "Por pouco", "Quem sabe na próxima", "Fim de jogo", "Já vi melhores", "Achei que era melhor"]

  const random = Math.floor(Math.random() * arr.length );

  return (
    <div className="ContainerGameOver">
      <h1>{arr[random]}</h1>
      <button onClick={retry} className="reset">voltar</button>
    </div>
  )
}

export default GameOver