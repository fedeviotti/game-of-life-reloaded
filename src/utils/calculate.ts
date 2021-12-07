import { TOTAL_GRID_CELLS } from '../constants/grid-info';
import styles from '../styles/game-of-life-grid.module.css';
import { CellInterface } from '../components/game-of-life-grid';
import { getNextState } from './get-next-state';
import { createGrid } from './create-grid';

const calculate = (grid: CellInterface[]): CellInterface[] => {
  const nextGrid: CellInterface[] = createGrid([]);
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    const cell: CellInterface = getNextState(i, grid);
    nextGrid[i] = {
      id: cell.id,
      currentState: cell.nextState as number,
      nextState: null,
      className: cell.nextState === 1 ? styles.new : styles.dead,
    };
  }
  // window.console.log('[nextGrid]', nextGrid);
  return nextGrid;
};

export { calculate };
