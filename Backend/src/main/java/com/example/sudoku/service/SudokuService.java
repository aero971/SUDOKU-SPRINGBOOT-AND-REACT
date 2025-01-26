package com.example.sudoku.service;

import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;
import java.util.Random;

@Service
public class SudokuService {

    // Logic to generate a Sudoku puzzle
    public int[][] generatePuzzle() {
        int[][] puzzle = new int[9][9];

        // Step 1: Generate a solved Sudoku puzzle
        generateSolvedPuzzle(puzzle);

        // Step 2: Remove random numbers to create a puzzle
        removeNumbers(puzzle, 40);  // You can adjust the number to set the difficulty

        return puzzle;
    }

    // Method to generate a solved Sudoku puzzle using backtracking
    private void generateSolvedPuzzle(int[][] puzzle) {
        solve(puzzle);  // Call the solve method to fill the puzzle with a valid solution
    }

    // Backtracking algorithm to solve the Sudoku puzzle
    private boolean solve(int[][] puzzle) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (puzzle[row][col] == 0) { // Empty cell found
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(puzzle, row, col, num)) {
                            puzzle[row][col] = num; // Try placing the number

                            if (solve(puzzle)) { // Recurse to solve the rest
                                return true;
                            }

                            puzzle[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // Solved
    }

    // Check if the number can be placed at the given position
    private boolean isValid(int[][] puzzle, int row, int col, int num) {
        // Check row
        for (int c = 0; c < 9; c++) {
            if (puzzle[row][c] == num) {
                return false;
            }
        }

        // Check column
        for (int r = 0; r < 9; r++) {
            if (puzzle[r][col] == num) {
                return false;
            }
        }

        // Check 3x3 sub-grid
        int startRow = row - row % 3;
        int startCol = col - col % 3;
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                if (puzzle[startRow + r][startCol + c] == num) {
                    return false;
                }
            }
        }

        return true; // Valid placement
    }

    // Method to remove random numbers from the solved puzzle to create a Sudoku puzzle
    private void removeNumbers(int[][] puzzle, int numbersToRemove) {
        Random random = new Random();
        int count = 0;

        // Randomly remove numbers from the solved puzzle
        while (count < numbersToRemove) {
            int row = random.nextInt(9);
            int col = random.nextInt(9);

            if (puzzle[row][col] != 0) {
                puzzle[row][col] = 0;  // Remove the number
                count++;
            }
        }
    }

    // Logic to validate the Sudoku puzzle
    public boolean validatePuzzle(int[][] puzzle) {
        // Validate rows and columns
        for (int i = 0; i < 9; i++) {
            if (!isValidRow(puzzle, i) || !isValidColumn(puzzle, i)) {
                return false;
            }
        }

        // Validate 3x3 sub-grids
        for (int row = 0; row < 9; row += 3) {
            for (int col = 0; col < 9; col += 3) {
                if (!isValidSubGrid(puzzle, row, col)) {
                    return false;
                }
            }
        }

        return true; // Valid if all checks pass
    }

    private boolean isValidRow(int[][] puzzle, int row) {
        Set<Integer> seen = new HashSet<>();
        for (int col = 0; col < 9; col++) {
            int num = puzzle[row][col];
            if (num != 0) { // Ignore empty cells
                if (seen.contains(num)) {
                    return false; // Duplicate found
                }
                seen.add(num);
            }
        }
        return true;
    }

    private boolean isValidColumn(int[][] puzzle, int col) {
        Set<Integer> seen = new HashSet<>();
        for (int row = 0; row < 9; row++) {
            int num = puzzle[row][col];
            if (num != 0) { // Ignore empty cells
                if (seen.contains(num)) {
                    return false; // Duplicate found
                }
                seen.add(num);
            }
        }
        return true;
    }

    private boolean isValidSubGrid(int[][] puzzle, int startRow, int startCol) {
        Set<Integer> seen = new HashSet<>();
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                int num = puzzle[startRow + row][startCol + col];
                if (num != 0) { // Ignore empty cells
                    if (seen.contains(num)) {
                        return false; // Duplicate found
                    }
                    seen.add(num);
                }
            }
        }
        return true;
    }

    // Method to solve the Sudoku puzzle (main entry point)
    public int[][] solvePuzzle(int[][] puzzle) {
        if (solve(puzzle)) {
            return puzzle; // If solved, return the puzzle
        } else {
            throw new IllegalArgumentException("The given Sudoku puzzle cannot be solved");
        }
    }
}
