import { idOf } from './id-of';
import { CellInterface } from '../components/game-of-life-grid';

const createCell = (h: number, v: number): CellInterface => ({
  id: idOf(h, v),
  currentState: 0,
  nextState: null,
  className: '',
});

export { createCell };
