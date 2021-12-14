import { TOTAL_GRID_CELLS } from '../constants/grid-info';
import styles from '../styles/game-of-life-grid.module.css';
import { CellInterface } from '../components/game-of-life-grid';
import { getNextState } from './get-next-state';
import { createGrid } from './create-grid';
import { GameOfLifeGridState } from '../store/slices/game-of-life-grid-slice';

const calculate = (
  grid: CellInterface[],
  gridStore?: GameOfLifeGridState,
): CellInterface[] => {
  const nextGrid: CellInterface[] = createGrid(
    [],
    gridStore?.totalGridCells,
    gridStore?.cols,
  );
  const total = gridStore?.totalGridCells || TOTAL_GRID_CELLS;
  for (let i = 0; i < total; i++) {
    const cell: CellInterface = getNextState(
      i,
      [...grid],
      gridStore?.rows,
      gridStore?.cols,
    );
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
