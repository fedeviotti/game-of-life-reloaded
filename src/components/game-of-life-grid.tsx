import * as React from 'react';

import styles from '../styles/game-of-life-grid.module.css';

interface CellInterface {
  id: string;
  currentState: number;
  nextState: number | null;
}

interface DomCellInterface {
  id: string;
  className: string;
}

const MAX = 60;

const idOf = (h: number, v: number): string => `i-${h}-${v}`;

const createCell = (h: number, v: number): CellInterface => ({
  id: idOf(h, v),
  currentState: 0,
  nextState: null,
});

const initGrid = () => {
  const grid: CellInterface[][] = [];
  for (let i = 0; i < MAX; i++) {
    grid[i] = [];
    for (let j = 0; j < MAX; j++) {
      grid[i][j] = { id: '', currentState: 0, nextState: null };
    }
  }
  return grid;
};

const createGrid = (grid: CellInterface[][]) => {
  for (let i = 0; i < MAX; i++) {
    grid[i] = [];
    for (let j = 0; j < MAX; j++) {
      grid[i][j] = createCell(i, j);
    }
  }
  return grid;
};

const firstPaint = (grid: CellInterface[][]): DomCellInterface[] => {
  const firstDomCells: DomCellInterface[] = [];
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
      // if (
      //   (i === 1 && j === 2) ||
      //   (i === 2 && j === 3) ||
      //   (i === 3 && j === 1) ||
      //   (i === 3 && j === 2) ||
      //   (i === 3 && j === 3)
      // ) {
      //   cell.currentState = 1;
      //   domCell.className = styles.live;
      // } else {
      //   cell.currentState = 0;
      //   domCell.className = styles.dead;
      // }
      firstDomCells.push(domCell);
    }
  }
  return firstDomCells;
};

const neighboursCoords = (x: number, y: number) => ({
  NW: x === 0 || y === 0 ? null : [x - 1, y - 1],
  N: y === 0 ? null : [x, y - 1],
  NE: x === MAX - 1 || y === 0 ? null : [x + 1, y - 1],
  E: x === MAX - 1 ? null : [x + 1, y],
  SE: x === MAX - 1 || y === MAX - 1 ? null : [x + 1, y + 1],
  S: y === MAX - 1 ? null : [x, y + 1],
  SW: y === MAX - 1 || x === 0 ? null : [x - 1, y + 1],
  W: x === 0 ? null : [x - 1, y],
});

const getNextState = (
  x: number,
  y: number,
  grid: CellInterface[][],
): CellInterface => {
  let liveNeighbours = 0;
  let nbrs = neighboursCoords(x, y);

  Object.values(nbrs)
    .filter((i) => i !== null)
    // @ts-ignore
    .forEach(([nX, nY]) => {
      liveNeighbours += grid[nX][nY].currentState;
    });

  let currentCell = grid[x][y];

  if (currentCell.currentState === 0 && liveNeighbours === 3) {
    currentCell.nextState = 1;
  } else if (
    currentCell.currentState === 1 &&
    (liveNeighbours < 2 || liveNeighbours > 3)
  ) {
    currentCell.nextState = 0;
  } else {
    currentCell.nextState = currentCell.currentState;
  }
  return currentCell;
};

const calculate = function (grid: CellInterface[][]): {
  nextGrid: CellInterface[][];
  nextDomCells: DomCellInterface[];
} {
  const nextDomCells: DomCellInterface[] = [];
  const nextGrid: CellInterface[][] = initGrid();
  for (let i = 0; i < MAX; i++) {
    for (let j = 0; j < MAX; j++) {
      const cell: CellInterface = getNextState(j, i, grid);
      nextGrid[j][i] = {
        id: cell.id,
        currentState: cell.nextState as number,
        nextState: null,
      };
      nextDomCells.push({
        id: cell.id,
        className: cell.nextState === 1 ? styles.new : styles.dead,
      });
    }
  }
  window.console.log('[nextGrid]', nextGrid);
  window.console.log('[nextDomCells]', nextDomCells);
  return { nextGrid, nextDomCells };
};

const GameOfLifeGrid: React.FC = () => {
  const [grid, setGrid] = React.useState<CellInterface[][]>(createGrid([]));
  const [domCells, setDomCells] = React.useState<DomCellInterface[]>([]);

  React.useEffect(() => {
    setDomCells(firstPaint(grid));
  }, []);

  const run = () => {
    const { nextGrid, nextDomCells } = calculate(grid);
    setGrid(nextGrid);
    setDomCells(nextDomCells);
  };

  React.useEffect(() => {
    setTimeout(() => {
      run();
    }, 100);
  }, [domCells]);

  return (
    <>
      <button onClick={run}>Click</button>
      <div className={styles.gridContainer}>
        {/*<pre>{JSON.stringify(domCells, null, 2)}</pre>*/}
        {domCells.map((domCell) => {
          return <div key={domCell.id} className={domCell.className} />;
        })}
      </div>
    </>
  );
};

export default GameOfLifeGrid;
