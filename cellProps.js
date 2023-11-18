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
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let alignment = document.querySelectorAll(".alignment");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bg-color-prop");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
// let addBar = document.querySelector(".address-bar");
let activeCellPrp = "#d1d8e0";
let inactiveCellPrp = "#ecf0f2";

bold.addEventListener("click", (e) => {
  let add = addBar.value;
  let [cell, cellprp] = getActiveCell(add);

  cellprp.bold = !cellprp.bold;
  cell.style.fontWeight = cellprp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellprp.bold ? activeCellPrp : inactiveCellPrp;
});

italic.addEventListener("click", (e) => {
  let add = addBar.value;
  let [cell, cellprp] = getActiveCell(add);

  cellprp.italic = !cellprp.italic;
  cell.style.fontStyle = cellprp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellprp.italic
    ? activeCellPrp
    : inactiveCellPrp;
});

underline.addEventListener("click", (e) => {
  let add = addBar.value;
  let [cell, cellprp] = getActiveCell(add);

  cellprp.underline = !cellprp.underline;
  cell.style.textDecoration = cellprp.underline ? "underline" : "normal";
  underline.style.backgroundColor = cellprp.underline
    ? activeCellPrp
    : inactiveCellPrp;
});

fontSize.addEventListener("change", (e) => {
  let add = addBar.value;
  let [cell, cellprp] = getActiveCell(add);

  cellprp.fontSize = fontSize.value;
  cell.style.fontSize = cellprp.fontSize + "px";
  fontSize.value = cellprp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let add = addBar.value;
  let [cell, cellprp] = getActiveCell(add);

  cellprp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellprp.fontFamily;
  fontFamily.value = cellprp.fontFamily;
});

function getActiveCell(add) {
  let [rid, cid] = decodeRCID(add);
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellprp = sheetDB[rid][cid];
  return [cell, cellprp];
}

function decodeRCID(add) {
  let rid = Number(add.slice(1) - 1);
  let cid = Number(add.charCodeAt(0)) - 65;
  return [rid, cid];
}
