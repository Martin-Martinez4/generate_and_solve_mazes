
export function SolveMazeWeightedBFS(rows, cols,mazeGrid) {

    // Move to a Flood Fill Solve file
    console.log(mazeGrid)
    let floodFillStack = [];
    mazeGrid[0][0].weight = 0;
    floodFillStack.push(mazeGrid[0][0]);
    while (floodFillStack.length > 0) {
        let cell = floodFillStack.pop();
        if (!cell.walls.top) {
            if (mazeGrid[cell.row - 1][cell.col].weight == undefined) {

                floodFillStack.push(mazeGrid[cell.row - 1][cell.col]);
                mazeGrid[cell.row - 1][cell.col].weight = cell.weight + 1;
            }
        }
        if (!cell.walls.bottom) {
            if (mazeGrid[cell.row + 1][cell.col].weight == undefined) {

                floodFillStack.push(mazeGrid[cell.row + 1][cell.col]);
                mazeGrid[cell.row + 1][cell.col].weight = cell.weight + 1;
            }
        }
        if (!cell.walls.left) {
            if (mazeGrid[cell.row][cell.col - 1].weight == undefined) {

                floodFillStack.push(mazeGrid[cell.row][cell.col - 1]);
                mazeGrid[cell.row][cell.col - 1].weight = cell.weight + 1;
            }
        }
        if (!cell.walls.right) {

            if (mazeGrid[cell.row][cell.col + 1].weight == undefined) {

                floodFillStack.push(mazeGrid[cell.row][cell.col + 1]);
                mazeGrid[cell.row][cell.col + 1].weight = cell.weight + 1;
            }
        }
    }

    console.log(mazeGrid)

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(`x${i}-y${j}`);

            // cell.innerText = mazeGrid[i][j].weight

            // cell.style.border = "black solid 1px";
            // cell.style.background = "black";
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
        }
    }

    let goalCell = mazeGrid[rows - 1][cols - 1];
    let backtrackingStack = [];
    let pathStack = [];
    backtrackingStack.push(goalCell);
    pathStack.push(goalCell);
    while (backtrackingStack.length > 0) {

        let currentCell = backtrackingStack.pop();
        let minimumWeightCell = currentCell;

        if (currentCell.weight == 0) {
            break;
        }

        if (!currentCell.walls.top) {
            if (mazeGrid[currentCell.row - 1][currentCell.col].weight < minimumWeightCell.weight) {
                minimumWeightCell = mazeGrid[currentCell.row - 1][currentCell.col];
            }
        }
        if (!currentCell.walls.bottom) {
            if (mazeGrid[currentCell.row + 1][currentCell.col].weight < minimumWeightCell.weight) {
                minimumWeightCell = mazeGrid[currentCell.row + 1][currentCell.col];
            }
        }
        if (!currentCell.walls.left) {
            if (mazeGrid[currentCell.row][currentCell.col - 1].weight < minimumWeightCell.weight) {
                minimumWeightCell = mazeGrid[currentCell.row][currentCell.col - 1];
            }
        }
        if (!currentCell.walls.right) {
            if (mazeGrid[currentCell.row][currentCell.col + 1].weight < minimumWeightCell.weight) {
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
        cell.style.background = "rgba(200,200,255,.95)";

    }
}





