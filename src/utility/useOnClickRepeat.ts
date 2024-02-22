import React, { useRef } from 'react';

type UseOnClickRepeatReturn = {
  onMouseDown: React.MouseEventHandler<HTMLElement>;
  onMouseUp: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
};

export const useOnClickRepeat = (
  onClick: React.MouseEventHandler<HTMLElement>,
  initialWaitMS = 500,
  tickMS = 150
): UseOnClickRepeatReturn => {
  const onClickFunc = useRef<React.MouseEventHandler<HTMLElement>>(onClick);
  // Refresh this ref on every render
  onClickFunc.current = onClick;
  const interval = useRef<number>();

  const clearAndStop = () => {
    clearInterval(interval.current);
    interval.current = undefined;
  };

  return {
    onMouseDown: e => {
      clearInterval(interval.current);
      onClickFunc.current(e);

      interval.current = window.setInterval(() => {
        clearInterval(interval.current);
        onClickFunc.current(e);
        interval.current = window.setInterval(
          () => onClickFunc.current(e),
          tickMS
        );
      }, initialWaitMS);
    },
    onMouseUp: clearAndStop,
    onMouseLeave: clearAndStop,
  };
};
