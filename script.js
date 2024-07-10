const container = document.querySelector("#container");
const DEFAULT_GRID_SIZE = 16;
const WIDTH = 480;
const HEIGHT = 480;
const containerHeight = (HEIGHT) + "px";
const containerWidth = (WIDTH) + "px";

let gridSize = DEFAULT_GRID_SIZE;

container.style.height = containerHeight;
container.style.width = containerWidth;

let miniContainers = [];
let divs = [];

function createGrid (pGridSize = DEFAULT_GRID_SIZE) {

    for (let index = 0; index < pGridSize; index += 1) {
        
        miniContainers[index] = document.createElement("div");
        miniContainers[index].classList.add("miniContainers");

        container.appendChild(miniContainers[index]);
    }

    for (let index = 0; index < pGridSize * pGridSize; index += 1) {
        
        divs[index] = document.createElement("div");
        divs[index].classList.add("divs");    
        miniContainers[Math.floor(index / pGridSize)].appendChild(divs[index]);
        divs[index].style.height = (HEIGHT / pGridSize) + "px";
    }
}

function removeGrid (pGridSize) {

    for (let index = 0; index < pGridSize * pGridSize; index += 1) {
        
        miniContainers[Math.floor(index / pGridSize)].removeChild(divs[index]);
    }

    divs = [];

    for (let index = 0; index < pGridSize; index += 1) {
        
        container.removeChild(miniContainers[index]);
    }

    miniContainers = [];
}

const body = document.querySelector("body");

const displaySize = document.createElement("div");
displaySize.setAttribute("id", "display-size");
displaySize.textContent = `Grid Size: ${gridSize} X ${gridSize}`;
body.appendChild (displaySize);

const slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", "1");
slider.setAttribute("max", "64");
slider.setAttribute("value", "16");
body.appendChild(slider);

slider.oninput = function() {
    
    displaySize.textContent = `Grid Size: ${this.value} X ${this.value}`;

    removeGrid (gridSize);

    gridSize = this.value;

    createGrid (gridSize);
}

createGrid ();