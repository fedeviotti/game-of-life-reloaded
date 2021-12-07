import { TOTAL_GRID_CELLS } from '../constants/grid-info';
import { calcX } from './calc-x';
import { calcY } from './calc-y';
import { CellInterface } from '../components/game-of-life-grid';
import { createCell } from './create-cell';

const createGrid = (grid: CellInterface[]) => {
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    grid[i] = createCell(calcX(i), calcY(i));
  }
  return grid;
};

export { createGrid };
