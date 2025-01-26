import React, { useState, useEffect } from "react";
import SudokuBoard from "./components/SudokuBoard";
import { getNewPuzzle, validatePuzzle, solvePuzzle } from "./services/sudokuService";
import "./App.css";
// import { solvePuzzle } from './services/sudokuService';  // Import solvePuzzle correctly

function App() {
  const [puzzle, setPuzzle] = useState(new Array(9).fill(new Array(9).fill(0)));
  const [message, setMessage] = useState("");

  // Fetch a new puzzle when the component mounts
  useEffect(() => {
    getNewPuzzle().then((data) => setPuzzle(data));
  }, []);

  // Validate the current puzzle
  const handleValidate = async () => {
    const isValid = await validatePuzzle(puzzle);
    setMessage(isValid ? "Puzzle is valid!" : "Puzzle is invalid!");
  };

  // Solve the current puzzle
  const handleSolve = async () => {
    const solvedPuzzle = await solvePuzzle(puzzle);
    setPuzzle(solvedPuzzle);
  };

  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <SudokuBoard puzzle={puzzle} setPuzzle={setPuzzle} />
      <div>
        <button onClick={handleValidate}>Validate Puzzle</button>
        <button onClick={handleSolve}>Solve Puzzle</button>
        <button onClick={() => getNewPuzzle().then((data) => setPuzzle(data))}>
          Get New Puzzle
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
