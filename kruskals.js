import { shuffle, makeMazeGrid } from "./utils.js";

export function kruskals(size){

    // Has to be a square matrix for now
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
    
    let rows = size;
    let columns = size;
    
    let mazeGrid =makeMazeGrid(rows, columns)
    
    
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
    shuffle(walls);
    
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

    return mazeGrid;
}





