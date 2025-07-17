const submit=document.getElementById('submit');
const reset=document.getElementById('reset');
const generate=document.getElementById('generate');
const invalidInputMsg = document.getElementById('invalid-input-msg'); 
const timeoutMsg = document.getElementById('timeout-msg');

// Global variables for timeout mechanism
let startTime;
let timeoutReached = false;
const TIMEOUT_DURATION = 10000; // 10 seconds in milliseconds

submit.addEventListener('click',answer);
reset.addEventListener('click',resetGrid);
generate.addEventListener('click',generatePuzzle);

function resetGrid(){
    // Clear all input fields
    const inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
        inputs[i].style.color = 'black'; // Reset color to default
    }
    
    // Hide any error messages
    invalidInputMsg.style.display = 'none';
    timeoutMsg.style.display = 'none';
    document.getElementById('alert-msg').style.display = 'none';
}

function answer(){
    var A= new Array();
    for (let i=0;i<81;i++){
                    //taking the input values in a 1D array
            A[i]=Number(document.getElementsByTagName('input')[i].value);
	    const inputValue = Number(document.getElementsByTagName('input')[i].value);
      

if (!isNaN(inputValue) && (inputValue === 0 || (inputValue >= 1 && inputValue <= 9))) {
    A[i] = inputValue;
} else {
    A[i] = 0;
    invalidInputMsg.style.display = 'block';
    return;
}
	    // If all inputs are valid, hide the invalid input message
    invalidInputMsg.style.display = 'none';	    
	    
    }
    //Giving output a different color        
    for(let i=0;i<81;i++){
        if(A[i]==0){
            document.getElementsByTagName('input')[i].style.color='rgb(89, 89, 231)';
        }
    }
        //converting 1D input array to a 2D array/board
        var board=[];
        while(A.length>0){
            board.push(A.splice(0,9));
         }
            
    let N = board.length;

    let inputValid= checkInput(board);
    
    if(inputValid){
        // Hide any previous error messages
        timeoutMsg.style.display = 'none';
        
        // Initialize timeout mechanism
        startTime = Date.now();
        timeoutReached = false;
        
        if (solveSudokuWithTimeout(board, N))
        {
            if (!timeoutReached) {
                print(board);
            }
        }
        else
        {
            if (timeoutReached) {
                timeoutMsg.style.display = 'block';
            } else {
                alert('No Solution');
            }
        }
    }
}

function isZero(board){
    let sum=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
        sum=sum+board[i][j];
    }
}
    return sum==0;
}

function checkInput(board){
    //check if there is no input
    if(isZero(board)){
        document.getElementById('alert-msg').style.display='block';
        return false
    }
    document.getElementById('alert-msg').style.display='none';
    return true;
}

function isSafe(board, row, col, value)
{
	
	//check if row has the value already
	for(let j = 0; j < board.length; j++)
	{	
		if (board[row][j] == value)
		{
			return false;
		}
	}

	//check if column has the value already
	for(let i = 0; i < board.length; i++)
	{	
		if (board[i][col] == value)
		{
			return false;
		}
	}

	//check if the 3*3 matrix has the value already
	let sqrt = Math.floor(Math.sqrt(board.length));
	let boxRowStart = row - row % sqrt;
	let boxColStart = col - col % sqrt;

	for(let i= boxRowStart;i<boxRowStart+sqrt;i++)
	{
		for(let j = boxColStart;j< boxColStart+sqrt;j++)
		{
			if (board[i][j] == value)
			{
				return false;
			}
		}
	}

	// If none of above conditions satisfied, it's safe
	return true;
}

function solveSudoku(board, n)
{
	let row = -1;
	let col = -1;
	let isEmpty = true;
	for(let i = 0; i < n; i++)
	{
		for(let j = 0; j < n; j++)
		{
			if (board[i][j] == 0)
			{
				row = i;
				col = j;

				// We still have some remaining
				// missing values in Sudoku
				isEmpty = false;
				break;
			}
		}
		if (!isEmpty)
		{
			break;
		}
	}

	// No empty space left
	if (isEmpty)
	{
		return true;
	}

	// Else for each-row backtrack
	for(let num = 1; num <= n; num++)
	{
		if (isSafe(board, row, col, num))
		{
			board[row][col] = num;
			if (solveSudoku(board, n))
			{
				return true;
			}
			else
			{
	
				board[row][col] = 0;
			}
		}
	}
	return false;
}

function solveSudokuWithTimeout(board, n)
{
	// Check timeout at the beginning of each recursive call
	if (Date.now() - startTime > TIMEOUT_DURATION) {
		timeoutReached = true;
		return false;
	}

	let row = -1;
	let col = -1;
	let isEmpty = true;
	for(let i = 0; i < n; i++)
	{
		for(let j = 0; j < n; j++)
		{
			if (board[i][j] == 0)
			{
				row = i;
				col = j;

				// We still have some remaining
				// missing values in Sudoku
				isEmpty = false;
				break;
			}
		}
		if (!isEmpty)
		{
			break;
		}
	}

	// No empty space left
	if (isEmpty)
	{
		return true;
	}

	// Else for each-row backtrack
	for(let num = 1; num <= n; num++)
	{
		// Check timeout before each attempt
		if (Date.now() - startTime > TIMEOUT_DURATION) {
			timeoutReached = true;
			return false;
		}

		if (isSafe(board, row, col, num))
		{
			board[row][col] = num;
			if (solveSudokuWithTimeout(board, n))
			{
				return true;
			}
			else
			{
				board[row][col] = 0;
			}
		}
	}
	return false;
}

function print(board){
    //changing 2D back to 1D
    const output = new Array();
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            output.push(board[i][j]);
        }
    }
   

    for(let k=0;k<81;k++){
    document.getElementsByTagName('input')[k].value=output[k];
    }
}

// Puzzle Generator Functions

function generatePuzzle() {
    const difficulty = document.getElementById('difficulty').value;
    
    // Clear the grid first
    resetGrid();
    
    // Generate a complete solved Sudoku
    const completeGrid = generateCompleteSudoku();
    
    // Remove numbers based on difficulty
    const puzzle = createPuzzle(completeGrid, difficulty);
    
    // Fill the grid with the generated puzzle
    fillGridWithPuzzle(puzzle);
}

function generateCompleteSudoku() {
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    
    // Fill the grid using backtracking
    fillGrid(grid);
    
    return grid;
}

function fillGrid(grid) {
    // Find empty cell
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                // Try numbers 1-9 in random order
                const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                
                for (let num of numbers) {
                    if (isValidPlacement(grid, row, col, num)) {
                        grid[row][col] = num;
                        
                        if (fillGrid(grid)) {
                            return true;
                        }
                        
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValidPlacement(grid, row, col, num) {
    // Check row
    for (let j = 0; j < 9; j++) {
        if (grid[row][j] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (grid[i][j] === num) return false;
        }
    }
    
    return true;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createPuzzle(completeGrid, difficulty) {
    const puzzle = completeGrid.map(row => [...row]); // Deep copy
    
    // Determine how many cells to remove based on difficulty
    let cellsToRemove;
    switch (difficulty) {
        case 'easy':
            cellsToRemove = Math.floor(Math.random() * 6) + 31; // 31-36 (49-50 clues)
            break;
        case 'medium':
            cellsToRemove = Math.floor(Math.random() * 6) + 41; // 41-46 (35-40 clues)
            break;
        case 'hard':
            cellsToRemove = Math.floor(Math.random() * 6) + 51; // 51-56 (25-30 clues)
            break;
        case 'expert':
            cellsToRemove = Math.floor(Math.random() * 8) + 57; // 57-64 (17-24 clues)
            break;
        default:
            cellsToRemove = 40;
    }
    
    // Create array of all positions
    const positions = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            positions.push([i, j]);
        }
    }
    
    // Shuffle positions
    const shuffledPositions = shuffleArray(positions);
    
    // Remove cells
    for (let i = 0; i < cellsToRemove && i < shuffledPositions.length; i++) {
        const [row, col] = shuffledPositions[i];
        puzzle[row][col] = 0;
    }
    
    return puzzle;
}

function fillGridWithPuzzle(puzzle) {
    const inputs = document.getElementsByTagName('input');
    let index = 0;
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (puzzle[i][j] !== 0) {
                inputs[index].value = puzzle[i][j];
                inputs[index].style.color = 'black';
                inputs[index].style.fontWeight = 'bold';
            } else {
                inputs[index].value = '';
                inputs[index].style.color = 'black';
            }
            index++;
        }
    }
    
    // Hide any error messages
    document.getElementById('alert-msg').style.display = 'none';
    invalidInputMsg.style.display = 'none';
    timeoutMsg.style.display = 'none';
}
