import { COLS } from '../constants/grid-info';

const calcY = (x: number) => Math.floor(x / COLS);

export { calcY };
