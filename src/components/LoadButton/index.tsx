import { useRef } from 'react';
import * as S from './styled';
import { Timeline } from '../../types/entry';
import { parseTimeline } from '../../utility/timeline-parser';

type LoadInputProps = {
  disabled?: boolean;
};

/** Returns a hidden input and a function that launches a load dialog */
export const useLoadInput = ({
  disabled,
}: LoadInputProps): [
  JSX.Element,
  (onLoadComplete: (timeline: Timeline) => void) => void
] => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onLoadComplete = useRef<(timeline: Timeline) => void>();
  const input = (
    <S.FileInput
      ref={inputRef}
      type="file"
      name="file"
      accept=".csv"
      onChange={({ target: { files } }) => {
        const file = files?.[0];
        if (file && onLoadComplete.current) {
          parseTimeline(file, onLoadComplete.current);
        }
      }}
      value=""
      disabled={disabled}
    />
  );
  return [
    input,
    (onLoad: (timeline: Timeline) => void) => {
      onLoadComplete.current = onLoad;
      inputRef.current?.click();
    },
  ];
};

// export interface LoadButtonProps extends LoadInputProps, ButtonProps {
//   onLoadComplete: (timeline: Timeline) => void;
// }

// export const LoadButton = ({
//   onLoadComplete,
//   children,
//   ...props
// }: LoadButtonProps): JSX.Element => {
//   const [input, promptLoad] = useLoadInput(props);
//   return (
//     <Button
//       {...props}
//       onClick={e => {
//         props.onClick?.(e);
//         promptLoad(onLoadComplete);
//       }}
//     >
//       {input}
//       {children}
//     </Button>
//   );
// };
