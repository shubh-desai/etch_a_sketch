const DEFAULT_GRID_SIZE = 16;
const WIDTH = 480;
const HEIGHT = 480;
const containerHeight = (HEIGHT) + "px";
const containerWidth = (WIDTH) + "px";

let currentColorChangeFunction = changeColorToBlack;
let gridSize = DEFAULT_GRID_SIZE;

const container = document.querySelector("#container");
container.style.height = containerHeight;
container.style.width = containerWidth;

const buttonsDiv = document.createElement("div");
buttonsDiv.setAttribute("id", "buttonsDiv");

const buttonRGB = document.createElement("button");
buttonRGB.textContent = "Rainbow";

buttonRGB.addEventListener("click", function() {  
    changeColorHandler(gridSize, changeColorToRGB);
});

buttonsDiv.appendChild (buttonRGB);

const buttonBlack = document.createElement("button");
buttonBlack.textContent = "Black";

buttonBlack.addEventListener("click", function() {  
    changeColorHandler(gridSize, changeColorToBlack);
});

buttonsDiv.appendChild (buttonBlack);

const buttonErase = document.createElement("button");
buttonErase.textContent = "Erase";

buttonErase.addEventListener("click", function() {  
    changeColorHandler(gridSize, changeColorToOriginal);
});

buttonsDiv.appendChild (buttonErase);

const buttonClear = document.createElement("button");
buttonClear.textContent = "Clear";

buttonClear.addEventListener("click", function() {
    removeGrid(gridSize);
    createGrid(gridSize, currentColorChangeFunction);
});

buttonsDiv.appendChild (buttonClear);

const buttonDarkening = document.createElement("button");
buttonDarkening.textContent = "Darkening";

buttonDarkening.addEventListener("click", function() {
    changeColorHandler(gridSize, changeOpacity);
});

buttonsDiv.appendChild (buttonDarkening);

const body = document.querySelector("body");
body.insertBefore(buttonsDiv, container);

let miniContainers = [];
let divs = [];

function changeColorToOriginal (pEvent) {

    let target = pEvent.target;

    target.style.backgroundColor = "white";

    target.style.opacity = 1;
}

function changeOpacity (pEvent) {

    let target = pEvent.target;

    if (target.style.opacity === "") {
        target.style.opacity = 0;
    } else if (Number(target.style.opacity) < 1) {
        target.style.opacity = Number(target.style.opacity) + 0.1;
    } else if (target.style.backgroundColor != "black") {
        target.style.opacity = 0;
    }

    target.style.backgroundColor = "black";
}

function changeColorToBlack (pEvent) {

    let target = pEvent.target;

    target.style.backgroundColor = "black";

    target.style.opacity = 1;
}

function changeColorToRGB (pEvent) {

    let target = pEvent.target;

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    target.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";

    target.style.opacity = 1;
}

function createGrid (pGridSize = DEFAULT_GRID_SIZE, pColorChange = changeColorToBlack) {

    for (let index = 0; index < pGridSize; index += 1) {
        
        miniContainers[index] = document.createElement("div");
        miniContainers[index].classList.add("miniContainers");

        container.appendChild(miniContainers[index]);
    }

    for (let index = 0; index < pGridSize * pGridSize; index += 1) {
        
        divs[index] = document.createElement("div");
        divs[index].classList.add("divs");
        miniContainers[Math.floor(index / pGridSize)].appendChild(divs[index]);
        divs[index].style.height = ((HEIGHT - 2) / pGridSize) + "px";
        divs[index].setAttribute("id", index);
    }

    attachColorChangeListener (pGridSize, pColorChange);
}

function attachColorChangeListener (pGridSize, pColorChange) {

    currentColorChangeFunction = pColorChange;

    for (let index = 0; index < pGridSize * pGridSize; index += 1) {
        
        divs[index].addEventListener("mouseenter", currentColorChangeFunction);
    }
}

function removeColorChangeListener (pGridSize) {

    for (let index = 0; index < pGridSize * pGridSize; index += 1) {
        
        divs[index].removeEventListener("mouseenter", currentColorChangeFunction);
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

const displaySize = document.createElement("div");
displaySize.setAttribute("id", "display-size");
displaySize.textContent = `Grid Size: ${gridSize} X ${gridSize}`;
body.appendChild (displaySize);

const slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", "1");
slider.setAttribute("max", "64");
slider.setAttribute("value", "16");
slider.classList.add("slider");
body.appendChild(slider);

slider.oninput = function() {
    
    displaySize.textContent = `Grid Size: ${this.value} X ${this.value}`;

    removeGrid (gridSize);

    gridSize = this.value;

    createGrid (gridSize, currentColorChangeFunction);
}

createGrid ();

function changeColorHandler (pGridSize, pColorFunction) {

    removeColorChangeListener (pGridSize);

    attachColorChangeListener (pGridSize, pColorFunction);
}