for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

    cell.addEventListener("blur", (e) => {
      let add = addBar.value;
      let [activecell, cellprp] = getActiveCell(add);
      let enteredData = activecell.innerText;

      if (enteredData === cellprp.value) return;
      cellprp.value = enteredData;
      removeChildFromParent(cellprp.formula);
      cellprp.formula = "";
      updateChildrenCells(add);
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

const removeChildFromGraph = (ipformula, childAdd) => {
  const [rid, cid] = decodeRCID(childAdd);
  let encodedFrml = ipformula.split(" ");
  for (let i = 0; i < encodedFrml.length; i++) {
    let asciiValue = encodedFrml[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRCID(encodedFrml[i]);
      graphComponentMatrix[prid][pcid].pop();
    }
  }
};

const updateChildrenCells = (parentAdd) => {
  let [prtcell, parentcellprp] = getActiveCell(parentAdd);
  let children = parentcellprp.children;

  for (let i = 0; i < children.length; i++) {
    let childAdd = children[i];

    let [childCell, ChildCellPrp] = getActiveCell(childAdd);

    let childFml = ChildCellPrp.formula;
    let evaluatedVal = evalFormula(childFml);
    setUIAndCellPrp(evaluatedVal, childFml, childAdd);
    updateChildrenCells(childAdd);
  }
};

frmlBar.addEventListener("keydown", (e) => {
  let inpformula = frmlBar.value;
  if (e.key === "Enter" && frmlBar.value) {
    let adr = addBar.value;
    let [cell, cellprp] = getActiveCell(adr);

    if (inpformula !== cellprp.formula) {
      removeChildFromParent(cellprp.formula);
    }
    addChildToGraph(inpformula, adr);
    let cycleResponse = isGraphCyclic(graphComponentMatrix);

    if (cycleResponse) {
      // alert("formula is cyclic");
      let response = confirm(
        "your formula cyclic ? do want to trace your path"
      );
      while (response == true) {
        isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
        let response = confirm(
          "your formula cyclic ? do want to trace your path"
        );
      }
      removeChildFromGraph(inpformula, adr);
      return;
    }
    let evaluatedVal = evalFormula(inpformula);

    setUIAndCellPrp(evaluatedVal, inpformula, adr);
    addChildToParent(inpformula);
    updateChildrenCells(adr);
  }
});

const addChildToGraph = (formula, childadd) => {
  const [rid, cid] = decodeRCID(childadd);
  let encodedFrml = formula.split(" ");
  for (let i = 0; i < encodedFrml.length; i++) {
    let asciiValue = encodedFrml[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRCID(encodedFrml[i]);
      graphComponentMatrix[prid][pcid].push([rid, cid]);
    }
  }
};

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

const setUIAndCellPrp = (evaluatedVal, formula, address) => {
  // let add = addBar.value;
  let [cell, cellprp] = getActiveCell(address);
  cell.innerText = evaluatedVal;
  cellprp.value = evaluatedVal;
  cellprp.formula = formula;
};
