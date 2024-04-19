import { shuffle, makeMazeGridPrims } from "./utils.js";

// grid of cells i,j
// start all at false 
// when placed in maze change to true

export function prims(size) {
    
    const rows = size;
    const cols = size;
    
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
    
    let mazeGrid = makeMazeGridPrims(rows, cols);
    

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
    if (currentCell.row < size - 1) {
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
        let randomCellIndex = Math.floor(Math.random() * frontierArray.length);
        currentCell = frontierArray[randomCellIndex];
        frontierArray.splice(randomCellIndex, 1);
        currentCell.inFrontier = false;
        currentCell.inMaze = true;

        const { row, col } = currentCell;
        // get top
        if (currentCell.row > 0) {
            topNeighbor = mazeGrid[row - 1][col];
            if (!topNeighbor.inFrontier && !topNeighbor.inMaze) {

                topNeighbor.inFrontier = true
                frontierArray.push(topNeighbor);
            }
        }
        // get right
        if (currentCell.col < cols - 1) {
            rightNeighbor = mazeGrid[row][col + 1];
            if (!rightNeighbor.inFrontier && !rightNeighbor.inMaze) {

                rightNeighbor.inFrontier = true
                frontierArray.push(rightNeighbor);
            }
        }
        // get bottom
        if (currentCell.row < rows - 1) {
            bottomNeighbor = mazeGrid[row + 1][col];
            if (!bottomNeighbor.inFrontier && !bottomNeighbor.inMaze) {

                bottomNeighbor.inFrontier = true;
                frontierArray.push(bottomNeighbor);
            }
        }
        // get left
        if (currentCell.col > 0) {
            leftNeighbor = mazeGrid[row][col - 1];
            if (!leftNeighbor.inFrontier && !leftNeighbor.inMaze) {

                leftNeighbor.inFrontier = true;
                frontierArray.push(leftNeighbor);
            }
        }

        // randomize choosing of wall to delete
        // put in array and shuffle array
        let neighbors = [];
        if (topNeighbor?.inMaze) {
            neighbors.push(directions.top)
        }
        if (rightNeighbor?.inMaze) {
            neighbors.push(directions.right)
        }
        if (bottomNeighbor?.inMaze) {
            neighbors.push(directions.bottom)

        }
        if (leftNeighbor?.inMaze) {
            neighbors.push(directions.left)
        }

        // shuffle(neighbors);
        let randomNeighborIndex = Math.floor(Math.random() * neighbors.length);
        // switch statment
        if (neighbors[randomNeighborIndex] == directions.top) {
            topNeighbor.walls.bottom = false;
            currentCell.walls.top = false;
        } else if (neighbors[randomNeighborIndex] == directions.right) {
            rightNeighbor.walls.left = false;
            currentCell.walls.right = false;

        } else if (neighbors[randomNeighborIndex] == directions.bottom) {
            bottomNeighbor.walls.top = false;
            currentCell.walls.bottom = false;

        } else if (neighbors[randomNeighborIndex] == directions.left) {
            leftNeighbor.walls.right = false;
            currentCell.walls.left = false;
        }
    }

    return mazeGrid
}




