// The Fisher–Yates shuffle
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Choose a random index
        let randomIndex = Math.floor(Math.random() * i);

        // Swap the elements
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];


    }
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

class PrimsCell extends Cell{
    constructor(row, col) {
       super(row, col)
        this.inMaze = false;
        this.inFrontier = false;
    }
}

// Make the grid
export function makeMazeGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i].push(new Cell(i, j));
        }
    }

    return grid;
}

// Make the grid Prims
export function makeMazeGridPrims(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i].push(new PrimsCell(i, j));
        }
    }

    return grid;
}

export function getEuclideanDistance(x1,x2,y1,y2){
    return Math.sqrt(((x2-x1)**2) + ((y2-y1)**2))
}
export function getManhattanDistance(x1,x2,y1,y2){
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}
export function getChebyshevDistance(x1,x2,y1,y2){
    return Math.max(y2 - y1, x2 - x1);
}

export function resetWeights(mazeGrid){

    for(let i = 0; i < mazeGrid.length; i++){
        for(let j = 0; j < mazeGrid[i].length; j++){
            mazeGrid[i][j].weight = undefined;
            mazeGrid[i][j].depth = undefined;
        }
    }

}

export async function getDeltaTime(func){
    let startTime = performance.now();
    await func();

    return performance.now() - startTime;
}
