# sudoku_solver1
# 🧩 Sudoku Solver

A modern, interactive web-based Sudoku solver and puzzle generator built with vanilla HTML, CSS, and JavaScript. This application allows users to solve Sudoku puzzles automatically using a backtracking algorithm and generate new puzzles with varying difficulty levels.

## ✨ Features

- **Interactive 9×9 Sudoku Grid**: Clean, user-friendly interface with visual 3×3 box separators
- **Automatic Solver**: Implements a backtracking algorithm with timeout protection (10 seconds)
- **Puzzle Generator**: Create new puzzles with multiple difficulty levels:
  - Easy (45-50 clues)
  - Medium (35-40 clues)
  - Hard (25-30 clues)
  - Expert (17-24 clues)
- **Input Validation**: Ensures only valid numbers (1-9) are entered
- **Visual Feedback**: Different colors for user input vs. solved values
- **Reset Functionality**: Clear the grid and start fresh
- **Responsive Design**: Modern UI with a pleasant color scheme

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or installations required

### Installation

1. Clone or download this repository to your local machine
2. Navigate to the project directory
3. Open `index.html` in your web browser

### Usage

#### Solving a Puzzle

1. **Manual Input**: Click on any cell in the 9×9 grid and enter numbers 1-9
2. **Generate Puzzle**: Use the "Generate Puzzle" button to create a new puzzle with your preferred difficulty
3. **Solve**: Click the "Solve" button to automatically solve the current puzzle
4. **Reset**: Click "Reset" to clear the grid and start over

#### Features in Detail

- **Input Validation**: Invalid inputs (numbers outside 1-9) will show an error message
- **Timeout Protection**: If a puzzle is unsolvable or takes too long, the algorithm will timeout after 10 seconds
- **Visual Distinction**: Solved numbers appear in a different color from user-entered numbers

## 🛠️ Technical Implementation

### Algorithm

The solver uses a **backtracking algorithm**:

1. **Find Empty Cell**: Locate the next empty cell in the grid
2. **Try Numbers**: Attempt to place numbers 1-9 in the cell
3. **Validate**: Check if the number is valid according to Sudoku rules:
   - No duplicate in the same row
   - No duplicate in the same column
   - No duplicate in the same 3×3 box
4. **Recurse**: If valid, move to the next empty cell
5. **Backtrack**: If no valid number works, backtrack and try the next option

### Puzzle Generation

The puzzle generator:

1. **Creates Complete Grid**: Generates a fully solved 9×9 Sudoku grid
2. **Removes Numbers**: Strategically removes numbers based on difficulty level
3. **Maintains Uniqueness**: Ensures the resulting puzzle has a unique solution


## 🎮 How to Play

### For Beginners

1. **Understand the Rules**: Each row, column, and 3×3 box must contain the numbers 1-9 exactly once
2. **Start Easy**: Use the "Generate Puzzle" feature and select "Easy" difficulty
3. **Use Logic**: Look for cells where only one number can fit
4. **Don't Guess**: Use the solver if you get stuck to see the solution

### For Advanced Users

1. **Challenge Yourself**: Try "Expert" level puzzles
2. **Time Yourself**: See how quickly you can solve different difficulty levels
3. **Learn Patterns**: Study the solved puzzles to improve your solving techniques
