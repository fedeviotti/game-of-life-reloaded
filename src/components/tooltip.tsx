import * as React from 'react';
import styles from '../styles/speed-controller.module.css';
import { Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

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

interface TooltipProps {
  text: string;
  isShowing: boolean;
  referenceElement: HTMLButtonElement | null;
  placement?: Placements;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  isShowing,
  referenceElement,
  placement = 'bottom',
}) => {
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null,
  );

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
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

  return (
    <Transition
      show={isShowing}
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
          <div>{text}</div>
        </div>
        <div
          className={styles.arrow}
          ref={setArrowElement}
          style={popperStyles.arrow}
        />
      </div>
    </Transition>
  );
};

export default Tooltip;
