let rows = 100;
let cols = 26;

let addColCount = document.querySelector(".add-col-container");
let rowColCount = document.querySelector(".add-row-container");
let cellsCount = document.querySelector(".cells-container");
let addBar = document.querySelector(".address-bar");

for (let i = 0; i < rows; i++) {
  let addCol = document.createElement("div");
  addCol.setAttribute("class", "add-col");
  addCol.innerText = i + 1;
  addColCount.appendChild(addCol);
}

for (let i = 0; i < cols; i++) {
  let addRow = document.createElement("div");
  addRow.setAttribute("class", "add-row");
  addRow.innerText = String.fromCharCode(65 + i);
  rowColCount.appendChild(addRow);
}

for (let i = 0; i < rows; i++) {
  let addRow = document.createElement("div");
  addRow.setAttribute("class", "cell-row");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    cell.setAttribute("spellcheck", "false");
    // cell.spellcheck(false);
    addRow.appendChild(cell);
    addListnerForAddBarDisplay(cell, i, j);
  }
  cellsCount.appendChild(addRow);
}

function addListnerForAddBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1;
    let colID = String.fromCharCode(65 + j);
    addBar.value = `${colID}${rowID}`;
  });
}

let firstcell = document.querySelector(".cell");
firstcell.click();
