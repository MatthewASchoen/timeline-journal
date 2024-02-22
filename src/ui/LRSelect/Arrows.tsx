import * as S from './styled';

const leftArrowChar = '◀'; //'◀←«';
const rightArrowChar = '▶'; //'▶→»';

type ArrowProps = React.HTMLAttributes<HTMLSpanElement>;

export const LeftArrow = (props: ArrowProps) => (
  <S.ArrowLeft {...props}>{leftArrowChar}</S.ArrowLeft>
);

export const RightArrow = (props: ArrowProps) => (
  <S.ArrowRight {...props}>{rightArrowChar}</S.ArrowRight>
);
