import { TOTAL_GRID_CELLS } from '../constants/grid-info';
import { CellInterface } from '../components/game-of-life-grid';
import styles from '../styles/game-of-life-grid.module.css';

const firstPaint = (
  grid: CellInterface[],
  totalGridCells?: number,
): CellInterface[] => {
  const nextGrid: CellInterface[] = [];
  const total = totalGridCells || TOTAL_GRID_CELLS;
  for (let i = 0; i < total; i++) {
    let cell = grid[i];
    let R = Math.random();
    if (R <= 0.5) {
      cell.currentState = 0;
      cell.className = styles.dead;
    } else {
      cell.currentState = 1;
      cell.className = styles.live;
    }
    // if (i === 7 || i === 13 || i === 16 || i === 17 || i === 18) {
    //   cell.currentState = 1;
    //   cell.className = styles.live;
    // } else {
    //   cell.currentState = 0;
    //   cell.className = styles.dead;
    // }
    nextGrid.push(cell);
  }
  return nextGrid;
};

export { firstPaint };
