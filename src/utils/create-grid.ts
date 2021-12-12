import { COLS, TOTAL_GRID_CELLS } from '../constants/grid-info';
import { calcX } from './calc-x';
import { calcY } from './calc-y';
import { CellInterface } from '../components/game-of-life-grid';
import { createCell } from './create-cell';

const createGrid = (
  grid: CellInterface[],
  totalGridCells?: number,
  cols?: number,
) => {
  const total = totalGridCells || TOTAL_GRID_CELLS;
  const actualCols = cols || COLS;
  for (let i = 0; i < total; i++) {
    grid[i] = createCell(calcX(i, actualCols), calcY(i, actualCols));
  }
  return grid;
};

export { createGrid };
