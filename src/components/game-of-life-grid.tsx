import * as React from 'react';

import { calculate } from '../utils/calculate';
import { createGrid } from '../utils/create-grid';
import { firstPaint } from '../utils/first-paint';
import { GameOfLifeGridState } from '../store/slices/game-of-life-grid-slice';
import { COLS, ROWS } from '../constants/grid-info';
import styles from '../styles/game-of-life-grid.module.css';
import Spinner from './spinner';

export interface CellInterface {
  id: string;
  currentState: number;
  nextState: number | null;
  className: string;
}

interface GameOfLifeGridProps {
  isRunning: boolean;
  timeoutDelay: number;
  reset: boolean;
  onResetComplete: () => void;
  onCounterChange: (increment: number) => void;
  gridStore?: GameOfLifeGridState;
}

const GameOfLifeGrid: React.FC<GameOfLifeGridProps> = ({
  isRunning,
  timeoutDelay,
  reset,
  onResetComplete,
  onCounterChange,
  gridStore,
}) => {
  // window.console.log('[GameOfLifeGrid Render]');
  const [grid, setGrid] = React.useState<CellInterface[]>(createGrid([]));
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setGrid(firstPaint(grid));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    if (gridStore?.gridFromFile) setGrid(gridStore.gridFromFile);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [gridStore?.gridFromFile]);

  React.useEffect(() => {
    if (reset) {
      if (gridStore?.gridFromFile) setGrid(gridStore?.gridFromFile);
      else setGrid(firstPaint(grid));
      onResetComplete();
    }
  }, [reset]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isRunning) {
      timeout = setTimeout(() => {
        setGrid(calculate(grid, gridStore));
        onCounterChange(1);
      }, timeoutDelay);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isRunning, grid]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex justify-center items-center w-4/5 min-h-[75vh]">
      <div
        style={{
          gridTemplateRows: `repeat(${
            gridStore?.rows || ROWS
          }, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${
            gridStore?.cols || COLS
          }, minmax(0, 1fr))`,
        }}
        className={styles.gridContainer}
      >
        {/*<pre>{JSON.stringify(domCells, null, 2)}</pre>*/}
        {grid.map((cell) => {
          return <div key={cell.id} className={cell.className} />;
        })}
      </div>
    </div>
  );
};

export default GameOfLifeGrid;
