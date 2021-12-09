import * as React from 'react';

import Dropzone from '../components/dropzone';
import GameOfLifeGrid from '../components/game-of-life-grid';
import { INITIAL_TIMEOUT_DELAY } from '../constants/grid-info';
import Button from '../components/button';
import SpeedController from '../components/speed-controller';

const GameOfLife: React.FC = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timeoutDelay, setTimeoutDelay] = React.useState<number>(
    INITIAL_TIMEOUT_DELAY,
  );

  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-14 items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <Dropzone />
        <div className="flex gap-5">
          <Button label="Start" onClick={() => setIsRunning(true)} />
          <Button label="Stop" onClick={() => setIsRunning(false)} />
        </div>
        <SpeedController
          timeoutDelay={timeoutDelay}
          setTimeoutDelay={setTimeoutDelay}
          isRunning={isRunning}
        />
      </div>

      <GameOfLifeGrid isRunning={isRunning} timeoutDelay={timeoutDelay} />
    </div>
  );
};

export default GameOfLife;
