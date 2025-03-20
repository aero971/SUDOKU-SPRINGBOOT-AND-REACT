package com.example.sudoku.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Random;

@Service
public class SudokuService {

    public int[][] generatePuzzle(String difficulty) {
        System.out.println("Generating puzzle with difficulty: " + difficulty); // Log difficulty
    
        int[][] puzzle = new int[9][9];
        generateSolvedPuzzle(puzzle); // Generate a solved puzzle first
    
        int numbersToRemove = switch (difficulty.toLowerCase()) {
            case "medium" -> 45;
            case "hard" -> 50;
            default -> 40; // Default to "easy"
        };
    
        System.out.println("Removing " + numbersToRemove + " cells"); // Log number of cells to remove
        removeNumbers(puzzle, numbersToRemove); // Remove cells based on difficulty
        return puzzle;
    }

    private void generateSolvedPuzzle(int[][] puzzle) {
        solve(puzzle);
    }

    public int[][] generateDailyPuzzle() {
    // Use a seed based on the current date to generate the same puzzle for the day
    long seed = LocalDate.now().toEpochDay();
    Random random = new Random(seed);
    int[][] puzzle = generatePuzzle("medium"); // Default difficulty for daily puzzle
    return puzzle;
    }

    private boolean solve(int[][] puzzle) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (puzzle[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(puzzle, row, col, num)) {
                            puzzle[row][col] = num;
                            if (solve(puzzle)) return true;
                            puzzle[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isValid(int[][] puzzle, int row, int col, int num) {
        for (int c = 0; c < 9; c++) if (puzzle[row][c] == num) return false;
        for (int r = 0; r < 9; r++) if (puzzle[r][col] == num) return false;
        int startRow = row - row % 3, startCol = col - col % 3;
        for (int r = 0; r < 3; r++)
            for (int c = 0; c < 3; c++)
                if (puzzle[startRow + r][startCol + c] == num) return false;
        return true;
    }

    private void removeNumbers(int[][] puzzle, int numbersToRemove) {
        Random random = new Random();
        Set<String> removedPositions = new HashSet<>();
    
        // Create a list of all non-zero cell positions
        List<String> nonZeroCells = new ArrayList<>();
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (puzzle[row][col] != 0) {
                    nonZeroCells.add(row + "," + col);
                }
            }
        }
    
        // Ensure we don't try to remove more cells than available
        numbersToRemove = Math.min(numbersToRemove, nonZeroCells.size());
    
        // Remove cells randomly
        while (removedPositions.size() < numbersToRemove) {
            String pos = nonZeroCells.get(random.nextInt(nonZeroCells.size()));
            if (!removedPositions.contains(pos)) {
                int row = Integer.parseInt(pos.split(",")[0]);
                int col = Integer.parseInt(pos.split(",")[1]);
                puzzle[row][col] = 0;
                removedPositions.add(pos);
            }
        }
    }

    public boolean validatePuzzle(int[][] puzzle) {
        for (int i = 0; i < 9; i++)
            if (!isValidRow(puzzle, i) || !isValidColumn(puzzle, i)) return false;
        for (int row = 0; row < 9; row += 3)
            for (int col = 0; col < 9; col += 3)
                if (!isValidSubGrid(puzzle, row, col)) return false;
        return true;
    }

    private boolean isValidRow(int[][] puzzle, int row) {
        Set<Integer> seen = new HashSet<>();
        for (int num : puzzle[row])
            if (num != 0 && !seen.add(num)) return false;
        return true;
    }

    private boolean isValidColumn(int[][] puzzle, int col) {
        Set<Integer> seen = new HashSet<>();
        for (int[] row : puzzle)
            if (row[col] != 0 && !seen.add(row[col])) return false;
        return true;
    }

    private boolean isValidSubGrid(int[][] puzzle, int startRow, int startCol) {
        Set<Integer> seen = new HashSet<>();
        for (int r = 0; r < 3; r++)
            for (int c = 0; c < 3; c++) {
                int num = puzzle[startRow + r][startCol + c];
                if (num != 0 && !seen.add(num)) return false;
            }
        return true;
    }

    public int[][] solvePuzzle(int[][] puzzle) {
        if (solve(puzzle)) return puzzle;
        throw new IllegalArgumentException("The given Sudoku puzzle cannot be solved");
    }

    public int[][] getHint(int[][] puzzle, int[][] originalPuzzle) {
        Random random = new Random();
        List<int[]> emptyCells = new ArrayList<>();
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (originalPuzzle[row][col] == 0 && puzzle[row][col] == 0) {
                    emptyCells.add(new int[]{row, col});
                }
            }
        }
        if (emptyCells.isEmpty()) return puzzle;

        int[] cell = emptyCells.get(random.nextInt(emptyCells.size()));
        int[][] solution = Arrays.stream(puzzle).map(int[]::clone).toArray(int[][]::new);
        if (solve(solution)) {
            puzzle[cell[0]][cell[1]] = solution[cell[0]][cell[1]];
        }
        return puzzle;
    }
}