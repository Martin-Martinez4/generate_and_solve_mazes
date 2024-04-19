import { drawMaze } from "./draw.js";
import { kruskals } from "./kruskals.js";
import { recursive_backtracking } from "./recursive_backtracking.js";
import { prims } from "./prims.js";
import { SolveMazeWeightedBFS } from "./weighted_BFS_solver.js";
import { getDistance } from "./utils.js";
import { SolveMazeGreedy } from "./greedy_BFS_Solver.js";

const maxSize = 90;
let size = 10;
let mazeGrid;

const mazeEl = document.getElementById("maze");
const sizeEl = document.getElementById("size");
const descriptionEl = document.getElementById("maze_description");

sizeEl.value = size;

// Get the desired size of the maze
sizeEl.addEventListener("change", function(e){
    console.log(e.target.value);
    if(e.target.value > maxSize){
        e.target.value = maxSize;
        size = maxSize;
    }
    else{

        size = e.target.value;
    }
})

// Maze Generation Algorithms
const primsEl = document.getElementById("prims");
const kruskalsEl = document.getElementById("kruskals");
const backtrackingEl = document.getElementById("backtracking");

// Add event listeners
primsEl.addEventListener("click", function(){
    mazeEl.innerHTML = "";
    mazeGrid = prims(size);
    drawMaze(size, mazeGrid);
    descriptionEl.innerText = `This ${size}x${size} maze was generated using Prim's Algorithm.`
});
kruskalsEl.addEventListener("click", function(){
    mazeEl.innerHTML = "";
    mazeGrid = kruskals(size);
    drawMaze(size, mazeGrid);
    descriptionEl.innerText = `This ${size}x${size} maze was generated using Kruskal's Algorithm.`

});
backtrackingEl.addEventListener("click", function(){
    mazeEl.innerHTML = "";
    mazeGrid = recursive_backtracking(size);
    drawMaze(size, mazeGrid);
    descriptionEl.innerText = `This ${size}x${size} maze was generated using Recursive Backtracking.`

});

// Maze Solution Algorithms
const breadth_firstEl = document.getElementById("breadth_first");
const greedyEl = document.getElementById("greedy");

// Add Eventlisteners
breadth_firstEl.addEventListener("click", function(){
    if (mazeGrid){
        SolveMazeWeightedBFS(size, mazeGrid);
    }
    else{
        alert("Please Generate a Maze First")
    }

});

greedyEl.addEventListener("click", function(){
    if(mazeGrid){
        SolveMazeGreedy(size, mazeGrid);
    }
    else{
        alert("Please Generate a Maze First")

    }
});




