import React from "react";

function SudokuBoard({ puzzle, setPuzzle }) {
  // Handle change in the cell
  const handleChange = (event, row, col) => {
    const newPuzzle = [...puzzle];
    newPuzzle[row][col] = event.target.value ? parseInt(event.target.value) : 0;
    setPuzzle(newPuzzle);
  };

  return (
    <div className="sudoku-board">
      {puzzle.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}  // Unique key for each cell
            type="number"
            value={cell === 0 ? "" : cell}
            onChange={(e) => handleChange(e, rowIndex, colIndex)}
            min="0"
            max="9"
            className="sudoku-cell"
          />
        ))
      ))}
    </div>
  );
}

export default SudokuBoard;
