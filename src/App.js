//css
import './App.css';
//react
import { useCallback, useEffect, useState } from 'react';
//data
import {wordsList} from "./data/words"
//components
import SecretWordStart from './components/SecretWordStart';
import Game from './components/Game';
import GameOver from './components/GameOver';
import ModoDeJogo from './components/ModoDeJogo';

const stages = [
  {id:1, name: "start" },
  {id:2, name: "select" },
  {id:3, name: "game" },
  {id:4, name: "end" }
]


function App() {

  const [quessesQtd, setQuessesQtd] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickeCategory, setpickeCategory] = useState("")
  const [letters, setLetters] = useState([])

  const[quessedLetteres, setGuessedLetters] = useState([])
  const[wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(quessesQtd)
  

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const wordsInCategory = words[category]; 
  
    const word = wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)]; 
    
    return { word, category };
  }, [words]);

  const selectGame = () => {
     setGameStage(stages[1].name)
  }

  //selecionando dificuldade
  const initGameFacil = () => {
       setQuessesQtd(5)
       startGame()
  }
  
  const initGamemedio = () => {
      setQuessesQtd(3)
      startGame()
  }

  const initGamedificil = () => {
    setQuessesQtd(1)
    startGame()
  }

  const startGame = useCallback(() => {
    clearLetterStages()
    setGameStarted(true)

    //pegando palavras
    const {word, category} = pickWordAndCategory()
    
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((e) => e.toLowerCase())
   

    setPickedWord(word)
    setpickeCategory(category)
    setLetters(wordLetters)
    setGameStage(stages[2].name)
  }, [pickWordAndCategory, letters])

  const retry = () => {
    setGameStage(stages[0].name)
}
 
  const verifyLetter = (letter) =>{
    const normalized = letter.toLowerCase()
    if(quessedLetteres.includes(normalized) || wrongLetters.includes(normalized)){
      return;
    }
    if(letters.includes(normalized)){
      setGuessedLetters((e) => [...e,normalized])
    }else{
      setWrongLetters((e) => [...e,normalized])
      
      setGuesses((actualGuesses) => actualGuesses -1)
    }
  }

  const clearLetterStages = () => {
      setGuessedLetters([])
      setWrongLetters([])
      setGuesses(quessesQtd)
  }
 
  //check loser
  useEffect(() =>{
      if(guesses <= 0){
         //reset all stages
         clearLetterStages()
         setGameStage(stages[3].name)
      }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
     
    if(gameStarted && quessedLetteres.length === uniqueLetters.length){
       startGame()
    }
  }, [quessedLetteres, letters,startGame])

  useEffect(() => {
       setGuesses(quessesQtd)
  }, [quessesQtd])
  return (
    <div className="App">

      { gameStage === 'start' && <SecretWordStart selectGame={selectGame}/>}

      {gameStage === "select" &&
      <ModoDeJogo
      initGameFacil={initGameFacil} 
      initGamemedio={initGamemedio} initGamedificil={initGamedificil}
       />}

      {gameStage === 'game' && (
      <Game 
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickeCategory={pickeCategory}
      letters={letters}
      quessedLetteres={quessedLetteres}
      wrongLetters={wrongLetters}
      guesses={guesses}
      />)}

      {gameStage === 'end' && <GameOver retry={retry}/>}
      
    </div>
  );
}

export default App;
