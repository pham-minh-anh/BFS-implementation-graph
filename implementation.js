const chessboard = [];

// Initialize the chessboard to 0;
for (let i = 0; i < 8; i++) {
  chessboard[i] = [];
  for (let j = 0; j < 8; j++) {
    chessboard[i][j] = 0;
  }
}
function canMove(position) {
  let [x, y] = position;
  if (x < 0 || x >= 8) {
    return false;
  } else if (y < 0 || y >= 8) {
    return false;
  } else if (chessboard[x][y] > 0) {
    return false;
  } else {
    return true;
  }
}

function visited(position, iterator) {
  let [x, y] = position;
  if (x < 0 || x >= 8) {
    return false;
  } else if (y < 0 || y >= 8) {
    return false;
  } else {
    let indice = chessboard[x][y];
    if (indice === iterator) {
      return true;
    } else {
      return false;
    }
  }
}

function queuePush(queue, position, iterator) {
  if (canMove(position)) {
    queue.push(position);
    chessboard[position[0]][position[1]] = iterator;
  }
}

function backwardPathPush(path, position, iterator) {
  let [x, y] = position;
  if (visited([x + 1, y + 2], iterator)) {
    path.push([x + 1, y + 2]);
    return [x + 1, y + 2];
  } else if (visited([x + 2, y + 1], iterator)) {
    path.push([x + 2, y + 1]);
    return [x + 2, y + 1];
  } else if (visited([x - 1, y + 2], iterator)) {
    path.push([x - 1, y + 2]);
    return [x - 1, y + 2];
  } else if (visited([x - 2, y + 1], iterator)) {
    path.push([x - 2, y + 1]);
    return [x - 2, y + 1];
  } else if (visited([x + 1, y - 2], iterator)) {
    path.push([x + 1, y - 2]);
    return [x + 1, y - 2];
  } else if (visited([x + 2, y - 1], iterator)) {
    path.push([x + 2, y - 1]);
    return [x + 2, y - 1];
  } else if (visited([x - 1, y - 2], iterator)) {
    path.push([x - 1, y - 2]);
    return [x - 1, y - 2];
  } else if (visited([x - 2, y - 1], iterator)) {
    path.push([x - 2, y - 1]);
    return [x - 2, y - 1];
  }
}

function chessboardReset(chessboard) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      chessboard[i][j] = 0;
    }
  }
}
function knightMoves(startPosition, endPosition) {
  chessboardReset(chessboard);
  const queue = [];
  const path = [];
  let vertice;
  let iterator = 1;
  queuePush(queue, startPosition, iterator);

  while (queue.length > 0) {
    vertice = queue.shift();
    iterator = chessboard[vertice[0]][vertice[1]] + 1;
    if (vertice[0] === endPosition[0] && vertice[1] === endPosition[1]) {
      path.push(vertice);
      break;
    }
    let [x, y] = vertice;
    iterator = chessboard[x][y] + 1;
    queuePush(queue, [x + 1, y + 2], iterator);
    queuePush(queue, [x + 2, y + 1], iterator);
    queuePush(queue, [x - 1, y + 2], iterator);
    queuePush(queue, [x - 2, y + 1], iterator);
    queuePush(queue, [x + 1, y - 2], iterator);
    queuePush(queue, [x + 2, y - 1], iterator);
    queuePush(queue, [x - 1, y - 2], iterator);
    queuePush(queue, [x - 2, y - 1], iterator);
  }
  let position = [...vertice];
  for (let i = chessboard[vertice[0]][vertice[1]]; i > 1; i--) {
    position = backwardPathPush(path, position, i - 1);
  }
  return path.reverse();
}

export { knightMoves };
