// src/services/sudokuService.js

export const getNewPuzzle = async () => {
    try {
        const response = await fetch("http://localhost:8080/sudoku/new");
        if (!response.ok) {
            throw new Error("Error fetching new puzzle");
        }
        const data = await response.json();
        return data; // Return the new puzzle
    } catch (error) {
        console.error('Error fetching new puzzle:', error);
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
            body: JSON.stringify(puzzle)  // Send puzzle to backend
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
