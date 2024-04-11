export function drawMaze(size, mazeGrid) {
    const rows = size;
    const cols = size;
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
}