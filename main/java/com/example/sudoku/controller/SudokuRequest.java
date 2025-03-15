package com.example.sudoku.controller;

class SudokuRequest {
    private int[][] puzzle;

    public int[][] getPuzzle() {
        return puzzle;
    }

    public void setPuzzle(int[][] puzzle) {
        this.puzzle = puzzle;
    }
}
