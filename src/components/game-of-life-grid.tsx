import * as React from 'react';

import styles from '../styles/game-of-life-grid.module.css';

interface CellInterface {
  id: string;
  currentState: number;
  nextState: number;
}

interface DomCellInterface {
  id: string;
  className: string;
}

const MAX = 60;

const idOf = (h: number, v: number): string => `i-${h}-${v}`;

const Cell = (h: number, v: number): CellInterface => ({
  id: idOf(h, v),
  currentState: 0,
  nextState: 0,
});

const createGrid = (grid: CellInterface[][]) => {
  for (let i = 0; i < MAX; i++) {
    grid[i] = [];
    for (let j = 0; j < MAX; j++) {
      grid[i][j] = Cell(i, j);
    }
  }
  return grid;
};

const firstPaint = (
  grid: CellInterface[][],
  setDomCells: React.Dispatch<React.SetStateAction<DomCellInterface[]>>,
) => {
  const tempDomCells = [];
  for (let i = 0; i < MAX; i++) {
    for (let j = 0; j < MAX; j++) {
      let cell = grid[j][i];
      let domCell = { id: cell.id, className: '' };
      let R = Math.random();
      if (R <= 0.5) {
        cell.currentState = 0;
        domCell.className = styles.dead;
      } else {
        cell.currentState = 1;
        domCell.className = styles.live;
      }
      tempDomCells.push(domCell);
    }
  }
  setDomCells(tempDomCells);
};

const GameOfLifeGrid: React.FC = () => {
  const [grid] = React.useState<CellInterface[][]>(createGrid([]));
  const [domCells, setDomCells] = React.useState<DomCellInterface[]>([]);

  React.useEffect(() => {
    firstPaint(grid, setDomCells);
  }, []);

  return (
    <div className={styles.gridContainer}>
      {/*<pre>{JSON.stringify(domCells, null, 2)}</pre>*/}
      {domCells.map((domCell) => {
        let id = domCell.id;
        let [_, x, y] = id.split('-');
        let cell = grid[+x][+y];
        if (cell.currentState == cell.nextState) {
          // domCell.classList.remove('new');
        }
        cell.currentState = cell.nextState;
        cell.nextState = cell.currentState;

        //domCell.className = cell.currentState === 0 ? styles.dead : styles.new;

        return <div className={domCell.className} />;
      })}
    </div>
  );
};

export default GameOfLifeGrid;
