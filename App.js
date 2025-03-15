import React, { useState, useEffect } from "react";
import SudokuBoard from "./components/SudokuBoard";
import { getNewPuzzle, validatePuzzle, solvePuzzle, getHint } from "./services/sudokuService";
import "./App.css";

function App() {
  const [puzzle, setPuzzle] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [originalPuzzle, setOriginalPuzzle] = useState([]);
  const [message, setMessage] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [hintsUsed, setHintsUsed] = useState(0);
  const maxHints = 3;
  const [theme, setTheme] = useState("light");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  
  useEffect(() => {
    fetchNewPuzzle(difficulty);
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);


  const fetchNewPuzzle = async (level) => {
    console.log("Fetching new puzzle with difficulty:", level); // Log difficulty
    const data = await getNewPuzzle(level); // Pass the difficulty level
    if (data && Array.isArray(data)) {
      setPuzzle(data);
      setOriginalPuzzle(data.map(row => [...row])); // Deep copy the puzzle
      setHintsUsed(0);
      setMessage("");
      setTimer(0);
      setIsTimerRunning(true);
    } else {
      setMessage("Failed to load puzzle.");
    }
  };

  const handleValidate = async () => {
    const isValid = await validatePuzzle(puzzle);
    setMessage(isValid ? "✅ Puzzle is valid!" : "❌ Puzzle is invalid!");
    if (isValid) {
      setIsTimerRunning(false); // Stop the timer when the puzzle is solved
    }
  };

  const handleSolve = async () => {
    const solvedPuzzle = await solvePuzzle(puzzle);
    setPuzzle(solvedPuzzle);
    setIsTimerRunning(false); // Stop the timer when the puzzle is solved
  };

  const handleHint = async () => {
    if (hintsUsed >= maxHints) {
      setMessage("No more hints available!");
      return;
    }
  
    const updatedPuzzle = await getHint(puzzle, originalPuzzle); // Pass both puzzle and originalPuzzle
    if (updatedPuzzle && Array.isArray(updatedPuzzle)) {
      setPuzzle(updatedPuzzle);
      setHintsUsed(hintsUsed + 1);
      setMessage(`Hint used: ${hintsUsed + 1}/${maxHints}`);
    } else {
      setMessage("Failed to get hint.");
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <h1>Sudoku Game</h1>
      <div className="controls">
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {/* Theme Toggle Button */}
      <button
        className={`theme-toggle ${theme}`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        data-tooltip={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      </div>

      <SudokuBoard puzzle={puzzle} setPuzzle={setPuzzle} originalPuzzle={originalPuzzle} />

      <div className="button-container">
        <button onClick={handleValidate}>✅ Validate Puzzle</button>
        <button onClick={handleSolve}>🔍 Solve Puzzle</button>
        <button onClick={handleHint} disabled={hintsUsed >= maxHints}>
          💡 Hint ({hintsUsed}/{maxHints})
        </button>
        <button onClick={() => fetchNewPuzzle(difficulty)}>🔄 Get New Puzzle</button>
      </div>

      <p className="message">{message}</p>
      <p>Time: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
    </div>
  );
}

export default App;
