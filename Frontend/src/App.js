import React, { useState, useEffect } from "react";
import SudokuBoard from "./components/SudokuBoard";
import { getNewPuzzle, validatePuzzle, solvePuzzle } from "./services/sudokuService";
import "./App.css";

function App() {
  const [puzzle, setPuzzle] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [originalPuzzle, setOriginalPuzzle] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getNewPuzzle().then((data) => {
      setPuzzle(data);
      setOriginalPuzzle(data.map(row => [...row])); // Store original puzzle state
    });
  }, []);

  const handleValidate = async () => {
    const isValid = await validatePuzzle(puzzle);
    setMessage(isValid ? "Puzzle is valid!" : "Puzzle is invalid!");
  };

  const handleSolve = async () => {
    const solvedPuzzle = await solvePuzzle(puzzle);
    setPuzzle(solvedPuzzle);
  };

  return (
    <div className="app-container">
      <h1>Sudoku Game</h1>
      <SudokuBoard puzzle={puzzle} setPuzzle={setPuzzle} originalPuzzle={originalPuzzle} />
      <div className="button-container">
        <button onClick={handleValidate}>Validate Puzzle</button>
        <button onClick={handleSolve}>Solve Puzzle</button>
        <button onClick={() => getNewPuzzle().then((data) => {
          setPuzzle(data);
          setOriginalPuzzle(data.map(row => [...row]));
        })}>
          Get New Puzzle
        </button>
      </div>
      <p className="message">{message}</p>
    </div>
  );
}

export default App;
