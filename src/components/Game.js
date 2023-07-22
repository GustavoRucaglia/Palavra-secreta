import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickeCategory,
  letters,
  quessedLetteres,
  wrongLetters,
  guesses,
}) => {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
      e.preventDefault()
      verifyLetter(letter)
      setLetter("")
      letterInputRef.current.focus()
      
  }
  return (
    <div className="game">
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        dica sobre a palavra: <span>{pickeCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
      {letters.map((letter, i) =>
        quessedLetteres.includes(letter) ? (
          <span key={i} className="letter">
            {letter}
          </span>
        ) : (
         <span key={i} className="blankSquare"></span>
            )
          )}
          
      </div>
      <div className="letterContainer">
        <form onSubmit={handleSubmit}>
          <label>Tente advinhar uma letra da palavra:</label>
          <input 
          type="text" 
          name="letter" 
          maxLength={1} 
          required onChange={(e) => setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}/>
          <br />
          <br />
          <button>Tentar</button>
        </form>
      </div>
      <br></br>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
