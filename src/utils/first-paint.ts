import { TOTAL_GRID_CELLS } from '../constants/grid-info';
import { CellInterface } from '../components/game-of-life-grid';
import styles from '../styles/game-of-life-grid.module.css';

const firstPaint = (grid: CellInterface[]): CellInterface[] => {
  const nextGrid: CellInterface[] = [];
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    let cell = grid[i];
    let R = Math.random();
    if (R <= 0.5) {
      cell.currentState = 0;
      cell.className = styles.dead;
    } else {
      cell.currentState = 1;
      cell.className = styles.live;
    }
    nextGrid.push(cell);
  }
  return nextGrid;
};

export { firstPaint };
