import { drawMaze } from "./draw.js";
import { kruskals } from "./kruskals.js";
import { recursive_backtracking } from "./recursive_backtracking.js";
import { prims } from "./prims.js";
import { SolveMazeWeightedBFS } from "./BFS_solver.js";
import { getChebyshevDistance, getDeltaTime, getEuclideanDistance, getManhattanDistance, resetWeights } from "./utils.js";

/*
    Conclusion: Either the mazes are too small for the heuristics to matter, the execution times are too fast to record accuratley, or my implementation is flawed.  The heuristics seem to not have a consistent effect on the time it takes to solve a maze.
*/
import { SolveMazeGreedy } from "./greedy_BFS_Solver.js";

const maxSize = 200;
let size = 20;
let mazeGrid;

// Will bew used to keep track of how long it took to solve the maze
let delta;

const mazeEl = document.getElementById("maze");
const sizeEl = document.getElementById("size");
const descriptionEl = document.getElementById("maze_description");
const solutionReport = document.getElementById("solution-report")

sizeEl.value = size;

// Get the desired size of the maze
sizeEl.addEventListener("change", function(e){
 
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
    solutionReport.innerText = ""
    solutionReport.innerText = ""
    mazeGrid = prims(size);
    drawMaze(size, mazeGrid);
    descriptionEl.innerText = `This ${size}x${size} maze was generated using Prim's Algorithm.`
});
kruskalsEl.addEventListener("click", function(){
    mazeEl.innerHTML = "";
    solutionReport.innerText = ""
    mazeGrid = kruskals(size);
    drawMaze(size, mazeGrid);
    descriptionEl.innerText = `This ${size}x${size} maze was generated using Kruskal's Algorithm.`

});
backtrackingEl.addEventListener("click", function(){
    if(sizeEl.value > 90){
        alert("Recursive backtracking not available. Values greater than 90 cause a stack overflow.")
        return;
    }
    mazeEl.innerHTML = "";
    solutionReport.innerText = ""
    mazeGrid = recursive_backtracking(size);
    drawMaze(size, mazeGrid);
    descriptionEl.innerText = `This ${size}x${size} maze was generated using Recursive Backtracking.`

});

// Maze Solution Algorithms
const breadth_firstEl = document.getElementById("breadth_first");
const  euclideanDistanceEl = document.getElementById("euclidean");
const  manhattanDistanceEl = document.getElementById("manhattan");
const  chebyshevDistanceEl = document.getElementById("chebyshev");

// Add Eventlisteners
breadth_firstEl.addEventListener("click", async function(){
    if (mazeGrid){
        resetWeights(mazeGrid);
        delta = await getDeltaTime(() =>  SolveMazeWeightedBFS(size, mazeGrid));

        solutionReport.innerText = `This mazed was solved in ${delta} ms using Breadth First Search without using a Hueristic. `
    }
    else{
        alert("Please Generate a Maze First")
    }

});

euclideanDistanceEl.addEventListener("click", async function(){
    if(mazeGrid){
        resetWeights(mazeGrid);

        delta = await getDeltaTime(() => SolveMazeGreedy(size, mazeGrid, getEuclideanDistance, "rgb(220, 180, 25)"));
        solutionReport.innerText = `This mazed was solved in ${delta} ms using Breadth First Search using Euclidean distance as a Hueristic. `


    }
    else{
        alert("Please Generate a Maze First")

    }
});

manhattanDistanceEl.addEventListener("click", async function(){
    if(mazeGrid){
        resetWeights(mazeGrid);

        delta = await getDeltaTime(() => SolveMazeGreedy(size, mazeGrid, getManhattanDistance, "rgb(25, 125, 25)"));
        solutionReport.innerText = `This mazed was solved in ${delta} ms using Breadth First Search using Manhattan distance as a Hueristic. `


    }
    else{
        alert("Please Generate a Maze First")

    }
});
chebyshevDistanceEl.addEventListener("click", async function(){
    if(mazeGrid){
        resetWeights(mazeGrid);

        delta = await getDeltaTime(() => SolveMazeGreedy(size, mazeGrid, getChebyshevDistance, "rgb(200, 100, 100)"));
        solutionReport.innerText = `This mazed was solved in ${delta} ms using Breadth First Search using Chebyshev distance as a Hueristic. `


    }
    else{
        alert("Please Generate a Maze First")

    }
});




