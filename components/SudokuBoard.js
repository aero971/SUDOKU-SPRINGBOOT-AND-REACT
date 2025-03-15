import React from "react";

function SudokuBoard({ puzzle, setPuzzle, originalPuzzle }) {
  console.log("Rendering puzzle with difficulty:", puzzle); // Log puzzle
  const handleChange = (event, row, col) => {
    const value = event.target.value ? parseInt(event.target.value) : 0;

    setPuzzle(prevPuzzle =>
      prevPuzzle.map((r, rIdx) =>
        rIdx === row ? r.map((c, cIdx) => (cIdx === col ? value : c)) : r
      )
    );
  };

  return (
    <div className="sudoku-board">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isPredefined = originalPuzzle[rowIndex]?.[colIndex] !== 0; // Check if the cell is predefined
          return (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              value={cell === 0 ? "" : cell}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              min="1"
              max="9"
              className={`sudoku-cell ${isPredefined ? "predefined" : "user-input"}`}
              readOnly={isPredefined} // Predefined numbers are non-editable
            />
          );
        })
      )}
    </div>
  );
}

export default SudokuBoard;

