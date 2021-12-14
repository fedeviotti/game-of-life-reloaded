import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { MS_PER_SEC, TIMEOUT_DELAY_STEP } from '../constants/grid-info';

import Tooltip from './tooltip';

interface SpeedControllerProps {
  timeoutDelay: number;
  setTimeoutDelay: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
}

const SpeedController: React.FC<SpeedControllerProps> = ({
  timeoutDelay,
  setTimeoutDelay,
  isRunning,
}) => {
  const [isDecreaseDisabled, setIsDecreaseDisabled] =
    React.useState<boolean>(false);
  const [isShowingDecrease, setIsShowingDecrease] = React.useState(false);
  const [refDecreaseElement, setRefDecreaseElement] =
    React.useState<HTMLButtonElement | null>(null);
  const [isShowingIncrease, setIsShowingIncrease] = React.useState(false);
  const [refIncreaseElement, setRefIncreaseElement] =
    React.useState<HTMLButtonElement | null>(null);

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

  const mouseHandler = (
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean,
  ) => setIsShow(value);

  return (
    <>
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        <Tooltip
          text="Speed Up"
          isShowing={isShowingDecrease}
          referenceElement={refDecreaseElement}
        />
        <button
          ref={setRefDecreaseElement}
          onMouseEnter={() => mouseHandler(setIsShowingDecrease, true)}
          onMouseLeave={() => mouseHandler(setIsShowingDecrease, false)}
          type="button"
          className={classNames(
            { 'hover:bg-gray-50': isRunning && !isDecreaseDisabled },
            'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50',
          )}
          onClick={onDecreaseHandler}
          disabled={!isRunning || isDecreaseDisabled}
        >
          <span className="sr-only">Decrease Speed</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <Tooltip
          text="Speed Down"
          isShowing={isShowingIncrease}
          referenceElement={refIncreaseElement}
        />
        <button
          ref={setRefIncreaseElement}
          onMouseEnter={() => mouseHandler(setIsShowingIncrease, true)}
          onMouseLeave={() => mouseHandler(setIsShowingIncrease, false)}
          type="button"
          className={classNames(
            { 'hover:bg-gray-50': isRunning },
            '-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50',
          )}
          onClick={onIncreaseHandler}
          disabled={!isRunning}
        >
          <span className="sr-only">Increase Speed</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </span>
      <span>{(MS_PER_SEC / timeoutDelay).toFixed(2)} renders/sec</span>
    </>
  );
};

export default SpeedController;
