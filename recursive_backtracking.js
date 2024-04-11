// grid of cells i,j
// start all at false 
// when placed in maze change to true
import { shuffle, makeMazeGrid } from "./utils.js";
import { drawMaze } from "./draw.js";


export function recursive_backtracking(size) {
    // causes cooridors at lower values
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

    let mazeGrid = makeMazeGrid(rows, cols);

    // choose first cell at random
    let randomRowIndex = Math.floor(Math.random() * rows);
    let randomColIndex = Math.floor(Math.random() * cols);

    function createPassage(rowIndex, colIndex, mazeGrid) {

        let walls = [directions.top, directions.right, directions.bottom, directions.left];
        shuffle(walls);
        let currentCell = mazeGrid[rowIndex][colIndex];
        for (let i = 0; i < walls.length; i++) {

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

    return mazeGrid
}







