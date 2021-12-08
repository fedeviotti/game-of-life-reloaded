import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { TIMEOUT_DELAY_STEP } from '../constants/grid-info';

interface SpeedControllerProps {
  setTimeoutDelay: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
}

const SpeedController: React.FC<SpeedControllerProps> = ({
  setTimeoutDelay,
  isRunning,
}) => {
  const [isDecreaseDisabled, setIsDecreaseDisabled] =
    React.useState<boolean>(false);

  const onDecreaseHandler = () => {
    setTimeoutDelay((prevState) => {
      if (prevState === 50) {
        setIsDecreaseDisabled(true);
      }
      if (prevState === 0) {
        return prevState;
      }
      return prevState - TIMEOUT_DELAY_STEP;
    });
  };

  const onIncreaseHandler = () => {
    setTimeoutDelay((prevState) => {
      if (isDecreaseDisabled) setIsDecreaseDisabled(false);
      return prevState + TIMEOUT_DELAY_STEP;
    });
  };

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50"
        onClick={onDecreaseHandler}
        disabled={!isRunning || isDecreaseDisabled}
      >
        <span className="sr-only">Decrease Speed</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50"
        onClick={onIncreaseHandler}
        disabled={!isRunning}
      >
        <span className="sr-only">Increase Speed</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </span>
  );
};

export default SpeedController;
