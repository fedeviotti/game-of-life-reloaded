import { calcX } from './calc-x';
import { calcY } from './calc-y';
import { calcI } from './calc-i';
import { COLS, ROWS } from '../constants/grid-info';

const neighboursCoords = (i: number) => {
  const x = calcX(i);
  const y = calcY(i);
  return {
    NW: x === 0 || y === 0 ? null : [calcI(x - 1, y - 1)],
    N: y === 0 ? null : [calcI(x, y - 1)],
    NE: x === COLS - 1 || y === 0 ? null : [calcI(x + 1, y - 1)],
    E: x === COLS - 1 ? null : [calcI(x + 1, y)],
    SE: x === COLS - 1 || y === ROWS - 1 ? null : [calcI(x + 1, y + 1)],
    S: y === ROWS - 1 ? null : [calcI(x, y + 1)],
    SW: y === ROWS - 1 || x === 0 ? null : [calcI(x - 1, y + 1)],
    W: x === 0 ? null : [calcI(x - 1, y)],
  };
};

export { neighboursCoords };
