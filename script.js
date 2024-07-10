const container = document.querySelector("#container");

const miniContainers = [];

for (let index = 0; index < 16; index += 1) {
    
    miniContainers[index] = document.createElement("div");
    miniContainers[index].classList.add("miniContainers");

    container.appendChild(miniContainers[index]);
}

const divs = [];

for (let index = 0; index < 16 * 16; index += 1) {
    
    divs[index] = document.createElement("div");
    divs[index].classList.add("divs");    
    miniContainers[Math.floor(index / 16)].appendChild(divs[index]);
}