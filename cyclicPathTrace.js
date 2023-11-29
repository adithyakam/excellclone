function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
  let [srow, scol] = cycleResponse;
  let visited = [];
  let dfsVisited = [];
  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       if (visited[i][j] == false) {
  //         let response = dfsCycleDetection(
  //           graphComponentMatrix,
  //           i,
  //           j,
  //           visited,
  //           dfsVisited
  //         );
  //         if (response === true) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  let response = dfsCycleDetection(
    graphComponentMatrix,
    srow,
    scol,
    visited,
    dfsVisited
  );

  if (response) return true;
  return false;
}

function delay() {}

function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  srow,
  scol,
  visited,
  dfsVisited
) {
  visited[srow][scol] = true;
  dfsVisited[srow][scol] = true;

  let cell = document.querySelector(`.cell[rid="${srow}"][cid="${scol}"]`);
  cell.style.backgroundColor = "lightblue";

  for (let i = 0; i < graphComponentMatrix[srow][scol].length; i++) {
    let [rid, cid] = graphComponentMatrix[srow][scol][i];
    if (visited[rid][cid] === false) {
      let response = dfsCycleDetection(
        graphComponentMatrix,
        rid,
        cid,
        visited,
        dfsVisited
      );
      if (response === true) {
        setTimeout(() => {
          cell.style.backgroundColor = "ligthblue";
        }, 2000);
        cell.style.backgroundColor = "transparent";

        return true;
      }
    } else if (dfsVisited[rid][cid] === true) {
      let cyclicCell = document.querySelector(
        `.cell[rid="${rid}"][cid="${cid}"]`
      );
      //   cyclicCell.style.backgroundColor = "ligthsalmon";
      cyclicCell.style.backgroundColor = "transparent";

      return true;
    }
  }

  dfsVisited[srow][scol] = false;
  return false;
}
