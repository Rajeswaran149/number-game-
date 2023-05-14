import React, { useState } from "react";

function Game() {
  const [gameState, setGameState] = useState({
    currentGuess: "",
    numGuesses: 0,
    gameHistory: [],
    gameCompleted: false,
  });
  const [playerName, setPlayerName] = useState("");
  const [computerNumber, setComputerNumber] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [almostCorrectNumber, setAlmostCorrectNumber] = useState(0);
  const [inCorrectNumber, setInCorrectNumber] = useState(0);

  function generateNumber() {
    let digits = [];
    while (digits.length < 4) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }
    console.log(digits.join(""));
    return digits.join("");
  }

  function handleGuess() {
    const { currentGuess, numGuesses, gameHistory } = gameState;
    if (currentGuess.length === 4) {
      console.log("in");
      const guessArray = currentGuess.split("");
      let numCorrect = 0;
      let numAlmost = 0;
      let inCorrect = 0;
      for (let i = 0; i < 4; i++) {
        if (guessArray[i] === computerNumber[i]) {
          numCorrect++;
        } else if (computerNumber.includes(guessArray[i])) {
          numAlmost++;
        } else {
          inCorrect++;
        }
      }
      const guessResult = `${numCorrect}+${numAlmost}-${inCorrect}*`;
      const updatedHistory = [
        ...gameHistory,
        { guess: currentGuess, result: guessResult },
      ];
      const updatedGameState = {
        ...gameState,
        numGuesses: numGuesses + 1,
        gameHistory: updatedHistory,
      };
      if (numCorrect === 4) {
        updatedGameState.gameCompleted = true;
      }
      setCorrectNumber(numCorrect);
      setAlmostCorrectNumber(numAlmost);
      setInCorrectNumber(inCorrect);
      setGameState(updatedGameState);
    } else {
      alert("please enter 4 digits");
    }
  }

  function handleNewGame() {
    if (playerName.length > 0) {
      setGameStart(!gameStart);
      setGameState({
        currentGuess: "",
        numGuesses: 0,
        gameHistory: [],
        gameCompleted: false,
      });
      setComputerNumber(generateNumber());
    } else {
      alert("enter your name!");
    }
  }

  function handleNewGameStart() {
    setPlayerName("");
    setGameState({
      currentGuess: "",
      numGuesses: 0,
      gameHistory: [],
      gameCompleted: false,
    });
    setGameStart(!gameStart);
    setAlmostCorrectNumber(0);
    setInCorrectNumber(0);
    setCorrectNumber(0);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  function handleGuessChange(event) {
    setGameState({ ...gameState, currentGuess: event.target.value });
  }

  const { currentGuess, numGuesses, gameHistory, gameCompleted } = gameState;

  return (
    <div className="container">
      {gameCompleted ? (
        <div>
          <h2>Congratulations {playerName}!</h2>
          <p>
            You guessed the number {gameState.computerNumber} in {numGuesses}{" "}
            tries!
          </p>
          <button onClick={handleNewGameStart}>New Game</button>
        </div>
      ) : (
        <div>
          {gameStart ? (
            <div>
              <h2>Welcome {playerName}!</h2>
              <p>Guess the computer's number:</p>
              <input
                type="text"
                value={currentGuess}
                onChange={handleGuessChange}
              />
              <button onClick={handleGuess}>Guess</button>
              <p>Number of guesses: {numGuesses}</p>
              <p>Number of number in correct place: {correctNumber}</p>
              <p>Number of number in wrong place: {almostCorrectNumber}</p>
              <p>InCorrect Number: {inCorrectNumber}</p>
              <ul>
                {gameHistory.map((entry, index) => (
                  <li key={index}>
                    {entry.guess} {entry.result}
                  </li>
                ))}
              </ul>
              <button onClick={handleNewGameStart}>ReStart</button>
            </div>
          ) : (
            <div>
              <p>Enter your name to start a new game:</p>
              <input
                type="text"
                value={playerName}
                onChange={handleNameChange}
              />
              <button onClick={handleNewGame}>New Game</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
