let addsheetbtn = document.querySelector(".sheet-add-icon");
let sheetfoldercontainer = document.querySelector(".sheet-folder-container");

addsheetbtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", ".sheet-folder");
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);
  sheet.innerHTML = `<div class="sheet-content">sheet ${allSheetFolders.length}</div>`;

  sheetfoldercontainer.appendChild(sheet);
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness();
  sheet.click();
});

function createSheetDB() {
  let sheetDB = [];
  for (i = 0; i < rows; i++) {
    let sheetRow = [];
    for (j = 0; j < cols; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        bgColor: "#000000",
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
    collectedsheetDB.push(sheetDB);
  }
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponent.push(graphComponentMatrix);
}

function handlesheetDB(sheetIdx) {
  sheetDB = collectedsheetDB(sheetIdx);
  graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handlesheetPrp() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
      cell.click();
    }
  }
  let firstcell = document.querySelector(".cell");
  firstcell.click();
}

function handlesheetUI() {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = o; i < allSheetFolders; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIdx = Number(sheet.getAttribute("id"));
    handleSheetDB(sheetIdx);
    handlesheetPrp();
    handlesheetUI(sheet);
  });
}
