import * as React from 'react';
import Dropzone from '../components/dropzone';
import GameOfLifeGrid from '../components/game-of-life-grid';
import { INITIAL_TIMEOUT_DELAY } from '../constants/grid-info';

const GameOfLife: React.FC = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timeoutDelay, setTimeoutDelay] = React.useState<number>(
    INITIAL_TIMEOUT_DELAY,
  );

  return (
    <div className="flex flex-row gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <Dropzone />
        <button
          className="p-2 pl-5 pr-5 bg-gray-800 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="p-2 pl-5 pr-5 bg-gray-800 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>
      </div>
      <GameOfLifeGrid isRunning={isRunning} timeoutDelay={timeoutDelay} />
    </div>
  );
};

export default GameOfLife;
