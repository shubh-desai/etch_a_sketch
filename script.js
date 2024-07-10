const container = document.querySelector("#container");
const gridSize = prompt("Enter a grid-size (between 1 and 100)");
const WIDTH = 480;
const HEIGHT = 480;
const divHeight = (HEIGHT / gridSize) + "px";
const containerHeight = (HEIGHT) + "px";
const containerWidth = (WIDTH) + "px";

container.style.height = containerHeight;
container.style.width = containerWidth;

const miniContainers = [];

for (let index = 0; index < gridSize; index += 1) {
    
    miniContainers[index] = document.createElement("div");
    miniContainers[index].classList.add("miniContainers");

    container.appendChild(miniContainers[index]);
}

const divs = [];

for (let index = 0; index < gridSize * gridSize; index += 1) {
    
    divs[index] = document.createElement("div");
    divs[index].classList.add("divs");    
    miniContainers[Math.floor(index / gridSize)].appendChild(divs[index]);
    divs[index].style.height = divHeight;
}