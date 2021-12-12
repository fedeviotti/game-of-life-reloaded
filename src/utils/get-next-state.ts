import { CellInterface } from '../components/game-of-life-grid';
import { neighboursCoords } from './neighbours-coords';

const getNextState = (
  i: number,
  grid: CellInterface[],
  rows?: number,
  cols?: number,
): CellInterface => {
  let liveNeighbours = 0;
  let nbrs = neighboursCoords(i, rows, cols);

  Object.values(nbrs)
    .filter((n) => n !== null)
    // @ts-ignore
    .forEach(([nX]) => {
      liveNeighbours += grid[nX].currentState;
    });

  let currentCell = { ...grid[i] };

  if (currentCell.currentState === 0 && liveNeighbours === 3) {
    currentCell.nextState = 1;
  } else if (
    currentCell.currentState === 1 &&
    (liveNeighbours < 2 || liveNeighbours > 3)
  ) {
    currentCell.nextState = 0;
  } else {
    currentCell.nextState = currentCell.currentState;
  }
  return currentCell;
};

export { getNextState };
