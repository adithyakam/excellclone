for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

    cell.addEventListener("blur", (e) => {
      let add = addBar.value;
      let [activecell, cellprp] = getActiveCell(add);
      let enteredData = activecell.innerText;

      cellprp.value = enteredData;
    });
  }
}

let frmlBar = document.querySelector(".formula-bar");

const addChildToParent = (formula) => {
  let childAdd = addBar.value;
  let encodedFrml = formula.split(" ");
  for (let i = 0; i < encodedFrml.length; i++) {
    let asciiValue = encodedFrml[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, parentcellprp] = getActiveCell(encodedFrml[i]);
      parentcellprp.children.push(childAdd);
    }
  }
};

const removeChildFromParent = (formula) => {
  let childAdd = addBar.value;
  let encodedFrml = formula.split(" ");
  for (let i = 0; i < encodedFrml.length; i++) {
    let asciiValue = encodedFrml[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, parentcellprp] = getActiveCell(encodedFrml[i]);

      let idx = parentcellprp.children.indexOf(childAdd);
      parentcellprp.children.splice(idx, 1);
      // parentcellprp.children.push(childAdd);
    }
  }
};

frmlBar.addEventListener("keydown", (e) => {
  let inpformula = frmlBar.value;

  if (e.key === "Enter" && frmlBar.value) {
    let evaluatedVal = evalFormula(inpformula);

    let add = addBar.value;
    let [cell, cellprp] = getActiveCell(add);

    if (inpformula !== cellprp.formula) {
      removeChildFromParent(cellprp.formula);
    }

    setUIAndCellPrp(evaluatedVal, inpformula);
    addChildToParent(inpformula);
    console.log(sheetDB);
  }
});

const evalFormula = (formula) => {
  let encodedFrml = formula.split(" ");
  for (let i = 0; i < encodedFrml.length; i++) {
    let asciiValue = encodedFrml[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellprp] = getActiveCell(encodedFrml[i]);
      encodedFrml[i] = cellprp.value;
    }
  }
  let decodedFormula = encodedFrml.join(" ");
  return eval(decodedFormula);
};

const setUIAndCellPrp = (evaluatedVal, formula) => {
  let add = addBar.value;
  let [cell, cellprp] = getActiveCell(add);
  cell.innerText = evaluatedVal;
  cellprp.value = evaluatedVal;
  cellprp.formula = formula;
};
