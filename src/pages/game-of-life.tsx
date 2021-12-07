import * as React from 'react';
import Dropzone from '../components/dropzone';
import GameOfLifeGrid from '../components/game-of-life-grid';

const GameOfLife: React.FC = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
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
      <GameOfLifeGrid isRunning={isRunning} />
    </div>
  );
};

export default GameOfLife;
