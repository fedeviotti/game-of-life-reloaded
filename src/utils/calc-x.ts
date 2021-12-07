import { COLS } from '../constants/grid-info';
import { calcY } from './calc-y';

const calcX = (x: number) => x - COLS * calcY(x);

export { calcX };
