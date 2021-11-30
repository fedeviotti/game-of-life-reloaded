import * as React from 'react';
import Dropzone from '../components/dropzone';
import GameOfLifeGrid from '../components/game-of-life-grid';

const GameOfLife: React.FC = () => {
  return (
    <>
      <Dropzone />
      <GameOfLifeGrid />
    </>
  );
};

export default GameOfLife;
