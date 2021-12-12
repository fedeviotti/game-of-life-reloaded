import { calcX } from './calc-x';
import { calcY } from './calc-y';
import { calcI } from './calc-i';
import { COLS, ROWS } from '../constants/grid-info';

const neighboursCoords = (i: number, rows?: number, cols?: number) => {
  const actualCols = cols || COLS;
  const actualRows = rows || ROWS;
  const x = calcX(i, actualCols);
  const y = calcY(i, actualCols);
  return {
    NW: x === 0 || y === 0 ? null : [calcI(x - 1, y - 1, actualCols)],
    N: y === 0 ? null : [calcI(x, y - 1, actualCols)],
    NE:
      x === actualCols - 1 || y === 0
        ? null
        : [calcI(x + 1, y - 1, actualCols)],
    E: x === actualCols - 1 ? null : [calcI(x + 1, y, actualCols)],
    SE:
      x === actualCols - 1 || y === actualRows - 1
        ? null
        : [calcI(x + 1, y + 1, actualCols)],
    S: y === actualRows - 1 ? null : [calcI(x, y + 1, actualCols)],
    SW:
      y === actualRows - 1 || x === 0
        ? null
        : [calcI(x - 1, y + 1, actualCols)],
    W: x === 0 ? null : [calcI(x - 1, y, actualCols)],
  };
};

export { neighboursCoords };
