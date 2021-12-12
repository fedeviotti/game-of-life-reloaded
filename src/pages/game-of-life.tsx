import * as React from 'react';

import Dropzone from '../components/dropzone';
import GameOfLifeGrid from '../components/game-of-life-grid';
import { INITIAL_TIMEOUT_DELAY } from '../constants/grid-info';
import Button from '../components/button';
import SpeedController from '../components/speed-controller';
import { useAppSelector } from '../store/hooks';

const GameOfLife: React.FC = () => {
  // window.console.log('[GameOfLife Render]');
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timeoutDelay, setTimeoutDelay] = React.useState<number>(
    INITIAL_TIMEOUT_DELAY,
  );
  const [reset, setReset] = React.useState<boolean>(false);
  const gridStore = useAppSelector((state) => state.gameOfLifeGrid);
  const [counter, setCounter] = React.useState<number>(
    gridStore.counterFromFile || 0,
  );

  const onResetHandler = () => {
    setIsRunning(false);
    setReset(true);
    setCounter(gridStore.counterFromFile || 0);
  };

  const onCounterChange = (increment: number) =>
    setCounter((prevState) => prevState + increment);

  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-14 items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <Dropzone />
        <div className="flex gap-5">
          <Button label="Start" onClick={() => setIsRunning(true)} />
          <Button label="Stop" onClick={() => setIsRunning(false)} />
          <Button label="Reset" onClick={onResetHandler} />
        </div>
        <span>Loop Counter: {counter}</span>
        <SpeedController
          timeoutDelay={timeoutDelay}
          setTimeoutDelay={setTimeoutDelay}
          isRunning={isRunning}
        />
      </div>

      <GameOfLifeGrid
        isRunning={isRunning}
        timeoutDelay={timeoutDelay}
        reset={reset}
        onResetComplete={() => setReset(false)}
        onCounterChange={(increment) => onCounterChange(increment)}
        gridStore={gridStore}
      />
    </div>
  );
};

export default GameOfLife;
