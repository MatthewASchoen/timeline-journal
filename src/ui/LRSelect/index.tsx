import { confirmKeys, leftKeys, rightKeys } from '../keys';
import { LeftArrow, RightArrow } from './Arrows';
import * as S from './styled';

type LRSelectProps = {
  value: string | number;
  onLeft: () => void;
  onRight: () => void;
};

const LRSelect = ({ value, onLeft, onRight }: LRSelectProps): JSX.Element => (
  <S.SelectBox>
    <LeftArrow onClick={onLeft} />
    <S.Value
      tabIndex={0}
      onKeyDown={({ key }) => {
        // console.log({ key });
        if (leftKeys.includes(key)) {
          onLeft();
        } else if (rightKeys.includes(key) || confirmKeys.includes(key)) {
          onRight();
        }
      }}
    >
      {value}
    </S.Value>
    <RightArrow onClick={onRight} />
  </S.SelectBox>
);

export default LRSelect;
