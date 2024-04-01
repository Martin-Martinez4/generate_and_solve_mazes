
class DisjointSet{
    rows;
    columns;
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.parents = new Array((this.rows*this.columns)).fill(-1);
    }

    findParent(cellIndex){
        if(this.parents[cellIndex] === -1){
            return cellIndex;
        }

        return this.findParent(this.parents[cellIndex]);
    }

    mergeTwo(cellIndex1, cellIndex2){
        const root1 = this.findParent(cellIndex1);
        const root2 = this.findParent(cellIndex2);
        this.parents[root1] = root2;
    }

    getIndex(rowIndex, columnIndex){
            /*
                [0,1,2,3,4,5]
                [0,1,2,3,4,5] row1 col3 = 10 row# * col_size + row#
                [0,1,2,3,4,5]   1*6 + 3

                flattened
                [0,1,2,3,4,5][0,1,2,3,4,5][0,1,2,3,4,5]
            
            */
        return rowIndex*this.columns + columnIndex;
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

let rows = 40;
let columns = 40;

let mazeGrid = [];
for(let row = 0; row < rows; row++){
    mazeGrid[row] = [];
    for(let column = 0; column < columns; column++){
        mazeGrid[row][column] = new Cell(row, column);
    }   
}

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

// Create a list of all walls
let walls = [];
for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
        if (column > 0) {

            walls.push({ x: column, y: row, direction: directions.left })
        }
        if (row > 0) {

            walls.push({ x: column, y: row, direction: directions.top })
        }
    }
}

let uSet = new DisjointSet(rows, columns);

// randomize the walls
// The Fisher–Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Choose a random index
        let randomIndex = Math.floor(Math.random() * i);

        // Swap the elements
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];


    }
}

shuffle(walls);
console.log(walls);

// Pick walls of the maze using Randomized Kruskal's Algorithm
const mazeWalls = [];
for (let i = 0; i < walls.length; i++) {
    const { x, y, direction } = walls[i];

    let newX = x;
    let newY = y;

    if (direction == directions.top) {
        newY--;
    }
    if (direction == directions.left) {
        newX--;
    }    
    let cell1Index = uSet.getIndex(x, y);
    let cell2Index = uSet.getIndex(newX, newY);

    let parentCell1 = uSet.findParent(cell1Index);

    let parentCell2 = uSet.findParent(cell2Index);

    if (parentCell1 != parentCell2) {
        mazeGrid[y][x].walls[direction] = false;
        mazeGrid[newY][newX].walls[opposite[direction]] = false;
        console.log(opposite[direction])
        uSet.mergeTwo(cell1Index, cell2Index);
    }


    // if yes


    // skip
    // else
    // remove the current wall and join the sets
    // Easier to add to a new array, but will take more space

    // When drawing you only need the walls array, the set can be discarded
    // iterate through the walls and add the border as you go.  
}

const maze = document.getElementById("maze");

for (let row = 0; row < rows; row++) {
    const rowEl = document.createElement("div");
    rowEl.style.width = '100%';
    rowEl.style.height = `100%`;

    rowEl.classList = `row row_${row}`;
    for (let j = 0; j < columns; j++) {
        const cell = document.createElement("div");
        cell.id = `x${row}-y${j}`;
        // cell.style.border = "black solid 1px";
        // cell.style.background = "black";
        cell.style.width = `${(100 / columns)}%`;
        cell.style.height = `100%`;
        cell.classList = "cell"
        console.log(row)
        console.log(mazeGrid[row][j])
        if (mazeGrid[row][j].walls.top) {
            cell.style.borderTop = "black solid 1px";
        }
        if (mazeGrid[row][j].walls.bottom) {
            cell.style.borderBottom = "black solid 1px";
        }
        if (mazeGrid[row][j].walls.left) {
            cell.style.borderLeft = "black solid 1px";
        }
        if (mazeGrid[row][j].walls.right) {
            cell.style.borderRight = "black solid 1px";
        }
        rowEl.appendChild(cell);
    }

    maze.appendChild(rowEl);

}




