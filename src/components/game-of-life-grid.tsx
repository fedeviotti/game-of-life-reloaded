import * as React from 'react';
import { Transition } from '@headlessui/react';

import { calculate } from '../utils/calculate';
import { createGrid } from '../utils/create-grid';
import { firstPaint } from '../utils/first-paint';
import { GameOfLifeGridState } from '../store/slices/game-of-life-grid-slice';
import { COLS, ROWS } from '../constants/grid-info';
import styles from '../styles/game-of-life-grid.module.css';
import { useAppSelector } from '../store/hooks';
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
  const isGridLoading = useAppSelector(
    (state) => state.gameOfLifeGrid.isGridLoading,
  );
  const [showGrid, setShowGrid] = React.useState<boolean>(true);
  const [showSpinner, setShowSpinner] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isGridLoading === true) {
      setShowGrid(!isGridLoading);
      timeout = setTimeout(() => {
        setShowSpinner(isGridLoading);
      }, 300);
    } else if (isGridLoading === false) {
      setShowSpinner(isGridLoading);
      timeout = setTimeout(() => {
        setShowGrid(!isGridLoading);
      }, 100);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isGridLoading]);

  React.useEffect(() => {
    setGrid(firstPaint(grid));
  }, []);

  React.useEffect(() => {
    if (gridStore?.gridFromFile) setGrid(gridStore.gridFromFile);
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

  return (
    <div className="flex justify-center items-center w-full min-h-[80vh]">
      <Transition
        show={showGrid}
        appear={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
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
      </Transition>
      <Transition
        show={showSpinner}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Spinner />
      </Transition>
    </div>
  );
};

export default GameOfLifeGrid;
