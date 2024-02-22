import { When, whenString } from '../../types/when';
import * as S from './styled';

type WhenLabelProps = {
  value: When;
  onClick?: () => void;
};

const WhenLabel = ({ value, onClick }: WhenLabelProps): JSX.Element => (
  <S.Label onClick={onClick} clickable={!!onClick} tabIndex={onClick && 0}>
    {whenString(value)}
  </S.Label>
);

export default WhenLabel;
