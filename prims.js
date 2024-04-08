import { SolveMazeWeightedBFS } from "./weighted_BFS_solver.js";

// grid of cells i,j
// start all at false 
// when placed in maze change to true
const rows = 20;
const cols = 20;

const directions = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left"
}
const opposite = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
        this.inMaze = false;
        this.inFrontier = false;
    }
}

// The Fisher–Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Choose a random index
        let randomIndex = Math.floor(Math.random() * i);

        // Swap the elements
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];


    }
}

// Make the grid
function makeMazeGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i].push(new Cell(i, j));
        }
    }

    return grid;
}

let mazeGrid = makeMazeGrid(rows, cols);

const maze = document.getElementById("maze");

// Maybe change to a canvas implementation
for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.style.width = '100%';
    row.style.height = `100%`;

    row.classList = `row row_${i}`;
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.id = `x${i}-y${j}`;
        // cell.style.border = "black solid 1px";
        // cell.style.background = "black";
        cell.style.width = `${(100 / cols)}%`;
        cell.style.height = `100%`;
        cell.classList = "cell";
        cell.style.background = "white";
        cell.style.border = "gray dotted 1px";
               

        row.appendChild(cell);
    }

    maze.appendChild(row);

}


// choose first cell at random
let randomRowIndex = Math.floor(Math.random() * rows);
let randomColIndex = Math.floor(Math.random() * cols);

let currentCell = mazeGrid[randomRowIndex][randomColIndex];
// idea: place the random cell inside the frontierArray and run the loop

// stack or array to store the frontier
let frontierArray = [];

// get its neighbors and put them in the frontier array
// should check if they are not in the maze
currentCell.inMaze = true;
currentCell.inFrontier = false;

const { row, col } = currentCell;
// get top
if (currentCell.col > 0) {
    let topNeighbor = mazeGrid[row][col - 1];
    topNeighbor.inFrontier = true
    frontierArray.push(topNeighbor);
}
// get right
if (currentCell.row < rows - 1) {
    let rightNeighbor = mazeGrid[row + 1][col];
    rightNeighbor.inFrontier = true
    frontierArray.push(rightNeighbor);
}
// get bottom
if (currentCell.col < cols - 1) {
    let bottomNeighbor = mazeGrid[row][col + 1]
    bottomNeighbor.inFrontier = true;
    frontierArray.push(bottomNeighbor);
}
// get left
if (currentCell.row > 0) {
    let leftNeighbor = mazeGrid[row - 1][col];
    leftNeighbor.inFrontier = true;
    frontierArray.push(leftNeighbor);
}

// randomize the frontier array. 

shuffle(frontierArray);

// Make a get neighbors function
// Thinking of making the frontier array a class

// pop from fontier to get the next cell

while (frontierArray.length > 0) {
    let topNeighbor = null;
    let rightNeighbor = null;
    let bottomNeighbor = null;
    let leftNeighbor = null;
    let randomCellIndex = Math.floor(Math.random()*frontierArray.length);
    currentCell = frontierArray[randomCellIndex];
    let currentCellEl = document.getElementById(`x${currentCell.row}-y${currentCell.col}`);
    currentCellEl.style.background = "white"
    frontierArray.splice(randomCellIndex, 1);
    currentCell.inFrontier = false;
    currentCell.inMaze = true;

    const { row, col } = currentCell;
    // get top
    if (currentCell.row > 0) {
        topNeighbor = mazeGrid[row-1][col];
        if (!topNeighbor.inFrontier && !topNeighbor.inMaze) {

            topNeighbor.inFrontier = true
            frontierArray.push(topNeighbor);
        }
    }
    // get right
    if (currentCell.col < cols-1) {
        rightNeighbor = mazeGrid[row][col+1];
        if (!rightNeighbor.inFrontier && !rightNeighbor.inMaze) {
            
            rightNeighbor.inFrontier = true
            frontierArray.push(rightNeighbor);
        }
    }
    // get bottom
    if (currentCell.row < rows-1) {
        bottomNeighbor = mazeGrid[row+1][col];
        if (!bottomNeighbor.inFrontier && !bottomNeighbor.inMaze) {

            bottomNeighbor.inFrontier = true;
            frontierArray.push(bottomNeighbor);
        }
    }
    // get left
    if (currentCell.col > 0) {
        leftNeighbor = mazeGrid[row][col-1];
        if (!leftNeighbor.inFrontier && !leftNeighbor.inMaze) {

            leftNeighbor.inFrontier = true;
            frontierArray.push(leftNeighbor);
        }
    }

    // randomize choosing of wall to delete
    // put in array and shuffle array
    let neighbors = [];
    if(topNeighbor?.inMaze){
        neighbors.push(directions.top)
    }
    if(rightNeighbor?.inMaze){
        neighbors.push(directions.right)
    }
    if(bottomNeighbor?.inMaze){
        neighbors.push(directions.bottom)

    }
    if(leftNeighbor?.inMaze){
        neighbors.push(directions.left)
    }

    // shuffle(neighbors);
    let randomNeighborIndex = Math.floor(Math.random()*neighbors.length);
    // switch statment
    if(neighbors[randomNeighborIndex] == directions.top){
        topNeighbor.walls.bottom = false;
        currentCell.walls.top = false;
    }else if(neighbors[randomNeighborIndex] == directions.right){
        rightNeighbor.walls.left = false;
        currentCell.walls.right = false;

    }else if(neighbors[randomNeighborIndex] == directions.bottom){
        bottomNeighbor.walls.top = false;
        currentCell.walls.bottom = false;

    }else if(neighbors[randomNeighborIndex] == directions.left){
        leftNeighbor.walls.right = false;
        currentCell.walls.left = false;
    }
}

// SolveMazeWeightedBFS(rows, cols, mazeGrid);

