// grid of cells i,j
// start all at false 
// when placed in maze change to true

import { SolveMazeWeightedBFS } from "./weighted_BFS_solver.js";

// causes cooridors at lower values
const rows = 50;
const cols = 50;

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
        this.visited = false;
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

// choose first cell at random
let randomRowIndex = Math.floor(Math.random() * rows);
let randomColIndex = Math.floor(Math.random() * cols);

function createPassage(rowIndex, colIndex, mazeGrid) {

    let walls = [directions.top, directions.right, directions.bottom, directions.left];
    shuffle(walls); 
    let currentCell = mazeGrid[rowIndex][colIndex];
    for(let i = 0; i < walls.length; i++){
        
        let currentWall = walls[i];
        
        let dX = rowIndex;
        let dY = colIndex;

        if (currentWall == directions.top) {
            dX--;
        }
        else if (currentWall == directions.right) {
            dY++;
        }
        else if (currentWall == directions.bottom) {
            dX++;
        }
        else if (currentWall == directions.left) {
            dY--;
        }
        
        if (dY < cols && dX < rows && dX >= 0 && dY >= 0 && !mazeGrid[dX][dY].visited) {
            currentCell.walls[currentWall] = false;
            currentCell.visited = true;
            mazeGrid[dX][dY].visited = true;
            mazeGrid[dX][dY].walls[opposite[currentWall]] = false;
            createPassage(dX, dY, mazeGrid);
        }
    }
    // Check if the index is valid
}

createPassage(randomRowIndex, randomColIndex, mazeGrid);

console.log(mazeGrid);

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
        if (mazeGrid[i][j].walls.top) {
            cell.style.borderTop = "black solid 1px";
        }
        if (mazeGrid[i][j].walls.bottom) {
            cell.style.borderBottom = "black solid 1px";
        }
        if (mazeGrid[i][j].walls.left) {
            cell.style.borderLeft = "black solid 1px";
        }
        if (mazeGrid[i][j].walls.right) {
            cell.style.borderRight = "black solid 1px";
        }
        row.appendChild(cell);
    }

    maze.appendChild(row);

}

// SolveMazeWeightedBFS(rows, cols, mazeGrid);







