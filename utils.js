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
