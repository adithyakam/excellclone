async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
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
  let response = await dfsCycleDetection(
    graphComponentMatrix,
    srow,
    scol,
    visited,
    dfsVisited
  );

  if (response) return Promise.resolve(true);
  return Promise.resolve(false);
}

function colorPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 2000);
  });
}

async function dfsCycleDetectionTracePath(
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

  await colorPromise();

  for (let i = 0; i < graphComponentMatrix[srow][scol].length; i++) {
    let [rid, cid] = graphComponentMatrix[srow][scol][i];
    if (visited[rid][cid] === false) {
      let response = await dfsCycleDetectionTracePath(
        graphComponentMatrix,
        rid,
        cid,
        visited,
        dfsVisited
      );
      if (response === true) {
        cell.style.backgroundColor = "ligthblue";
        await colorPromise();
        // cell.style.backgroundColor = "transparent";

        return Promise.resolve(true);
      }
    } else if (dfsVisited[rid][cid] === true) {
      let cyclicCell = document.querySelector(
        `.cell[rid="${rid}"][cid="${cid}"]`
      );
      cell.style.backgroundColor = "ligthblue";
      await colorPromise();
      cyclicCell.style.backgroundColor = "transparent";

      return Promise.resolve(true);
    }
  }

  dfsVisited[srow][scol] = false;
  return Promise.resolve(false);
}
