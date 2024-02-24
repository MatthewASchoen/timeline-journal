import * as S from './styled';

const leftArrowChar = '◀'; //'◀←«';
const rightArrowChar = '▶'; //'▶→»';
// const upArrowChar = '▲'; //'▲';

interface ArrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  flip?: boolean;
}

export const LeftArrow = (props: ArrowProps) => (
  <S.Arrow direction="left" {...props}>
    {leftArrowChar}
  </S.Arrow>
);

export const RightArrow = (props: ArrowProps) => (
  <S.Arrow direction="right" {...props}>
    {rightArrowChar}
  </S.Arrow>
);

export const DownArrow = (props: ArrowProps) => (
  <S.Arrow direction="down" {...props}>
    <svg viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  </S.Arrow>
);
