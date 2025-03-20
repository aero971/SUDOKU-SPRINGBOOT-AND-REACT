// src/services/sudokuService.js

export const getNewPuzzle = async (difficulty = "easy") => {
  try {
    console.log("Calling API with difficulty:", difficulty); // Log difficulty
    const response = await fetch(`http://localhost:8080/sudoku/new?difficulty=${difficulty}`);

    if (!response.ok) {
      const errorMsg = await response.text();
      console.error("Error fetching new puzzle:", errorMsg);
      throw new Error("Error fetching new puzzle: " + errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching new puzzle:", error);
    throw error;
  }
};

export const validatePuzzle = async (puzzle) => {
    try {
        const response = await fetch("http://localhost:8080/sudoku/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ puzzle }),
        });

        if (response.ok) {
            const isValid = await response.json();
            return isValid;  // Return validation result
        } else {
            throw new Error("Error validating puzzle");
        }
    } catch (error) {
        console.error('Error validating puzzle:', error);
        throw error;
    }
};

export const solvePuzzle = async (puzzle) => {
    try {
        const response = await fetch('http://localhost:8080/sudoku/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ puzzle })  // Send puzzle wrapped inside an object
        });

        if (response.ok) {
            const solvedPuzzle = await response.json();
            return solvedPuzzle;  // Return solved puzzle
        } else {
            throw new Error("Error solving puzzle");
        }
    } catch (error) {
        console.error('Error solving puzzle:', error);
        throw error;
    }
};

export const getHint = async (puzzle, originalPuzzle) => {
    try {
      const response = await fetch("http://localhost:8080/sudoku/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ puzzle, originalPuzzle }), // Send both puzzle and originalPuzzle
      });
  
      if (!response.ok) {
        const errorMsg = await response.text();
        console.error("Hint API Error:", errorMsg);
        throw new Error("Error fetching hint: " + errorMsg);
      }
  
      return await response.json(); // Ensure API returns the correct format
    } catch (error) {
      console.error("Error fetching hint:", error);
      throw error;
    }
  };

  