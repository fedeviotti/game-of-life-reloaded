import { calcX } from './calc-x';
import { calcY } from './calc-y';
import { calcI } from './calc-i';
import { COLS, ROWS } from '../constants/grid-info';

const neighboursCoords = (i: number, rows?: number, cols?: number) => {
  const c = cols || COLS;
  const r = rows || ROWS;
  const x = calcX(i, c);
  const y = calcY(i, c);
  return {
    NW: x === 0 || y === 0 ? null : [calcI(x - 1, y - 1, c)],
    N: y === 0 ? null : [calcI(x, y - 1, c)],
    NE: x === c - 1 || y === 0 ? null : [calcI(x + 1, y - 1, c)],
    E: x === c - 1 ? null : [calcI(x + 1, y, c)],
    SE: x === c - 1 || y === r - 1 ? null : [calcI(x + 1, y + 1, c)],
    S: y === r - 1 ? null : [calcI(x, y + 1, c)],
    SW: y === r - 1 || x === 0 ? null : [calcI(x - 1, y + 1, c)],
    W: x === 0 ? null : [calcI(x - 1, y, c)],
  };
};

export { neighboursCoords };
