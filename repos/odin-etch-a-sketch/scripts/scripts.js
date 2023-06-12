function clearExistingGrid() {
  const container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function makeNewGrid(rows, columns) {
  const container = document.querySelector(".container");
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", columns);

  for (let item = 0; item < rows * columns; item++) {
    const newDiv = document.createElement("div");

    newDiv.addEventListener("mouseover", () => {
      newDiv.setAttribute(
        "style",
        `background-color: ${generateRandomColor()};`
      );
    });

    container.appendChild(newDiv);
  }
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

makeNewGrid(16, 16);
const button = document.querySelector("button");
button.addEventListener("click", () => {
  let selectedSize;

  do {
    selectedSize = prompt("How many rows/columns?");
  } while (selectedSize > 100 || selectedSize < 1);

  clearExistingGrid();
  makeNewGrid(selectedSize, selectedSize);
});
