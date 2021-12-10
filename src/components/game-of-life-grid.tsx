import * as React from 'react';

import styles from '../styles/game-of-life-grid.module.css';
import { calculate } from '../utils/calculate';
import { createGrid } from '../utils/create-grid';
import { firstPaint } from '../utils/first-paint';

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
}

const GameOfLifeGrid: React.FC<GameOfLifeGridProps> = ({
  isRunning,
  timeoutDelay,
  reset,
  onResetComplete,
}) => {
  const [grid, setGrid] = React.useState<CellInterface[]>(createGrid([]));

  React.useEffect(() => {
    setGrid(firstPaint(grid));
  }, []);

  React.useEffect(() => {
    if (reset) {
      setGrid(firstPaint(grid));
      onResetComplete();
    }
  }, [reset]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isRunning) {
      timeout = setTimeout(() => {
        setGrid(calculate(grid));
      }, timeoutDelay);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isRunning, grid]);

  return (
    <div className={styles.gridContainer}>
      {/*<pre>{JSON.stringify(domCells, null, 2)}</pre>*/}
      {grid.map((cell) => {
        return <div key={cell.id} className={cell.className} />;
      })}
    </div>
  );
};

export default GameOfLifeGrid;
