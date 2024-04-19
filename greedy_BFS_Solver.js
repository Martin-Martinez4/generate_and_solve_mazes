import { getDistance } from "./utils.js";

class PriorityQueue {
    #queue = [];

    constructor() {
        // Maybe give option to start with values later
    }

    push(item) {
        this.#queue.push(item);

        
        // Find the place to place the new item
        let i = this.#queue.length-1;
        while (i > 0) {
            if (this.#queue[i].weight > this.#queue[i - 1].weight) {
                [this.#queue[i], this.#queue[i - 1]] = [this.#queue[i - 1], this.#queue[i]]
            }
            
            i--;
        }
    }

    pop() {
        return this.#queue.pop();
    }

    showQueue() {
        console.log(this.#queue);
    }

    getLength(){
        return this.#queue.length;
    }
}

export function SolveMazeGreedy(size, mazeGrid) {

    const rows = size;
    const cols = size;

    const target = {row: size-1, col: size-1};
    

    
    // Move to a Flood Fill Solve file
    let floodFillStack = new PriorityQueue();
    mazeGrid[0][0].weight = getDistance(0, target.row, 0, target.col);
    mazeGrid[0][0].depth = 0;

    floodFillStack.push(mazeGrid[0][0]);
    while (floodFillStack.getLength() > 0) {
        let cell = floodFillStack.pop();

        // let currentCell = document.getElementById(`x${cell.row}-y${cell.col}`);
        // currentCell.innerText = cell.depth;


        if(cell.row == target.row && cell.col == target.col){
            break;
        }
        if (!cell.walls.top) {
            if (mazeGrid[cell.row - 1][cell.col].weight == undefined) {

                mazeGrid[cell.row - 1][cell.col].weight = getDistance(cell.row-1, target.row, cell.col, target.col);
                mazeGrid[cell.row - 1][cell.col].depth = cell.depth + 1;
                floodFillStack.push(mazeGrid[cell.row - 1][cell.col]);
            }
        }
        if (!cell.walls.bottom) {
            if (mazeGrid[cell.row + 1][cell.col].weight == undefined) {
                
                mazeGrid[cell.row + 1][cell.col].weight = getDistance(cell.row + 1, target.row, cell.col, target.col);
                mazeGrid[cell.row + 1][cell.col].depth = cell.depth + 1;
                floodFillStack.push(mazeGrid[cell.row + 1][cell.col]);
            }
        }
        if (!cell.walls.left) {
            if (mazeGrid[cell.row][cell.col - 1].weight == undefined) {
                
                mazeGrid[cell.row][cell.col - 1].weight = getDistance(cell.row, target.row, cell.col-1, target.col);
                mazeGrid[cell.row][cell.col - 1].depth = cell.depth + 1;
                floodFillStack.push(mazeGrid[cell.row][cell.col - 1]);
            }
        }
        if (!cell.walls.right) {

            if (mazeGrid[cell.row][cell.col + 1].weight == undefined) {

                mazeGrid[cell.row][cell.col + 1].weight = getDistance(cell.row, target.row, cell.col+1, target.col);
                mazeGrid[cell.row][cell.col + 1].depth = cell.depth +1;
                floodFillStack.push(mazeGrid[cell.row][cell.col + 1]);
            }
        }
    }

    // Indicate the path
    let goalCell = mazeGrid[rows - 1][cols - 1];
    let backtrackingStack = [];
    let pathStack = [];
    backtrackingStack.push(goalCell);
    pathStack.push(goalCell);
    while (backtrackingStack.length > 0) {

        let currentCell = backtrackingStack.pop();
        let minimumWeightCell = currentCell;

        if (currentCell.depth == 0) {
            break;
        }

        if (!currentCell.walls.top) {
            if (mazeGrid[currentCell.row - 1][currentCell.col].depth < minimumWeightCell.depth) {
                minimumWeightCell = mazeGrid[currentCell.row - 1][currentCell.col];
            }
        }
        if (!currentCell.walls.bottom) {
            if (mazeGrid[currentCell.row + 1][currentCell.col].depth < minimumWeightCell.depth) {
                minimumWeightCell = mazeGrid[currentCell.row + 1][currentCell.col];
            }
        }
        if (!currentCell.walls.left) {
            if (mazeGrid[currentCell.row][currentCell.col - 1].depth < minimumWeightCell.depth) {
                minimumWeightCell = mazeGrid[currentCell.row][currentCell.col - 1];
            }
        }
        if (!currentCell.walls.right) {
            if (mazeGrid[currentCell.row][currentCell.col + 1].depth < minimumWeightCell.depth) {
                minimumWeightCell = mazeGrid[currentCell.row][currentCell.col + 1];
            }
        }

        backtrackingStack.push(minimumWeightCell);
        pathStack.push(minimumWeightCell);

    }

    console.log(pathStack);

    for (let i = 0; i < pathStack.length; i++) {
        let { row, col } = pathStack[i];
        let cell = document.getElementById(`x${row}-y${col}`);
        cell.style.background = "rgba(255,200,255,.95)";

    }
}



