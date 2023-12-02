let graphComponentMatrix = [];
let collectedGraphComponent = [];
// for (let i = 0; i < rows; i++) {
//   let row = [];
//   for (let j = 0; j < cols; j++) {
//     row.push([]);
//   }
//   graphComponentMatrix.push(row);
// }

function isGraphCyclic(graphComponentMatrix) {
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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] == false) {
        let response = dfsCycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        );
        if (response === true) {
          return [i, j];
        }
      }
    }
  }

  return null;
}

function dfsCycleDetection(
  graphComponentMatrix,
  srow,
  scol,
  visited,
  dfsVisited
) {
  visited[srow][scol] = true;
  dfsVisited[srow][scol] = true;

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
      if (response === true) return true;
    } else if (dfsVisited[rid][cid] === true) {
      return true;
    }
  }

  dfsVisited[srow][scol] = false;
  return false;
}
