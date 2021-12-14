import { calcY } from './calc-y';

const calcX = (x: number, cols: number) => x - cols * calcY(x, cols);

export { calcX };
