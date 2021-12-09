import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { usePopper } from 'react-popper';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { TIMEOUT_DELAY_STEP } from '../constants/grid-info';

import styles from '../styles/speed-controller.module.css';

type Placements =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

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
  const [hovered, setHovered] = React.useState(true);
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null,
  );
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom',
      strategy: 'fixed',
      modifiers: [
        { name: 'arrow', options: { element: arrowElement } },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'bottom'],
          },
        },
        { name: 'eventListeners', enabled: true },
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
      ],
    },
  );

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

  const mouseEnterHandler = () => setHovered(true);
  const mouseLeaveHandler = () => setHovered(true);

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        ref={setReferenceElement}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
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
      <button
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

      <Transition
        show={hovered}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={styles.tooltip}
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
        >
          <div className="bg-gray-800 text-gray-100 relative p-2 text-xs rounded shadow">
            <div>Speed Up</div>
          </div>
          <div
            className={styles.arrow}
            ref={setArrowElement}
            style={popperStyles.arrow}
          />
        </div>
      </Transition>
    </span>
  );
};

export default SpeedController;
