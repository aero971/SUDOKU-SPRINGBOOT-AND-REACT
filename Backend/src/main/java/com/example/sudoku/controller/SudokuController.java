package com.example.sudoku.controller;

import com.example.sudoku.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Adjust the port if necessary@CrossOrigin(origins = "http://localhost:3000")  // Adjust the port if necessary
@RequestMapping("/sudoku")
public class SudokuController {

    @Autowired
    private SudokuService sudokuService;

    @GetMapping("/new")
    public ResponseEntity<int[][]> getNewPuzzle() {
        try {
            int[][] puzzle = sudokuService.generatePuzzle();
            return ResponseEntity.ok(puzzle);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Handle puzzle generation failure
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validatePuzzle(@RequestBody SudokuRequest request) {
        try {
            boolean isValid = sudokuService.validatePuzzle(request.getPuzzle());
            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid Sudoku puzzle format or input.");
        }
    }

    @PostMapping("/solve")
    public ResponseEntity<?> solvePuzzle(@RequestBody SudokuRequest request) {
        try {
            int[][] solvedPuzzle = sudokuService.solvePuzzle(request.getPuzzle());
            return ResponseEntity.ok(solvedPuzzle);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("The given Sudoku puzzle cannot be solved.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while solving the puzzle.");
        }
    }

}
