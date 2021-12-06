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

const ROWS = 5;
const COLS = 5;
const TOTAL_GRID_CELLS = ROWS * COLS;

const calcY = (x: number) => Math.floor(x / COLS);
const calcX = (x: number) => x - COLS * calcY(x);

const calcI = (x: number, y: number) => y * COLS + x;

const idOf = (h: number, v: number): string => `i-${h}-${v}`;

const createCell = (h: number, v: number): CellInterface => ({
  id: idOf(h, v),
  currentState: 0,
  nextState: null,
});

const initGrid = () => {
  const grid: CellInterface[] = [];
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    grid[i] = { id: '', currentState: 0, nextState: null };
  }
  return grid;
};

const createGrid = (grid: CellInterface[]) => {
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    grid[i] = createCell(calcX(i), calcY(i));
  }
  return grid;
};

const firstPaint = (grid: CellInterface[]): DomCellInterface[] => {
  const firstDomCells: DomCellInterface[] = [];
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    let cell = grid[i];
    let domCell = { id: cell.id, className: '' };
    // let R = Math.random();
    // if (R <= 0.5) {
    //   cell.currentState = 0;
    //   domCell.className = styles.dead;
    // } else {
    //   cell.currentState = 1;
    //   domCell.className = styles.live;
    // }
    if (i === 7 || i === 13 || i === 16 || i === 17 || i === 18) {
      cell.currentState = 1;
      domCell.className = styles.live;
    } else {
      cell.currentState = 0;
      domCell.className = styles.dead;
    }
    firstDomCells.push(domCell);
  }
  return firstDomCells;
};

const neighboursCoords = (i: number) => {
  const x = calcX(i);
  const y = calcY(i);
  return {
    NW: x === 0 || y === 0 ? null : [calcI(x - 1, y - 1)],
    N: y === 0 ? null : [calcI(x, y - 1)],
    NE: x === COLS - 1 || y === 0 ? null : [calcI(x + 1, y - 1)],
    E: x === COLS - 1 ? null : [calcI(x + 1, y)],
    SE: x === COLS - 1 || y === ROWS - 1 ? null : [calcI(x + 1, y + 1)],
    S: y === ROWS - 1 ? null : [calcI(x, y + 1)],
    SW: y === ROWS - 1 || x === 0 ? null : [calcI(x - 1, y + 1)],
    W: x === 0 ? null : [calcI(x - 1, y)],
  };
};

const getNextState = (i: number, grid: CellInterface[]): CellInterface => {
  let liveNeighbours = 0;
  let nbrs = neighboursCoords(i);

  Object.values(nbrs)
    .filter((n) => n !== null)
    // @ts-ignore
    .forEach(([nX]) => {
      liveNeighbours += grid[nX].currentState;
    });

  let currentCell = grid[i];

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

const calculate = function (grid: CellInterface[]): {
  nextGrid: CellInterface[];
  nextDomCells: DomCellInterface[];
} {
  const nextDomCells: DomCellInterface[] = [];
  const nextGrid: CellInterface[] = initGrid();
  for (let i = 0; i < TOTAL_GRID_CELLS; i++) {
    const cell: CellInterface = getNextState(i, grid);
    nextGrid[i] = {
      id: cell.id,
      currentState: cell.nextState as number,
      nextState: null,
    };
    nextDomCells.push({
      id: cell.id,
      className: cell.nextState === 1 ? styles.new : styles.dead,
    });
  }
  window.console.log('[nextGrid]', nextGrid);
  window.console.log('[nextDomCells]', nextDomCells);
  return { nextGrid, nextDomCells };
};

const GameOfLifeGrid: React.FC = () => {
  const [grid, setGrid] = React.useState<CellInterface[]>(createGrid([]));
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
