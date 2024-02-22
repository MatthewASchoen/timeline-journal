import {
  When,
  WhenUnit,
  getUnitDisplay,
  isWhenValid,
  whenAdd,
  whenSubtract,
} from '../../types/when';
import LRSelect from '../../ui/LRSelect';

export type WhenValueLRProps = {
  value: When;
  setValue: (when: When) => void;
  unit: WhenUnit;
};

const WhenValueLR = ({
  value,
  setValue,
  unit,
}: WhenValueLRProps): JSX.Element => (
  <LRSelect
    value={getUnitDisplay(value, unit)}
    onLeft={() => {
      const newWhen = whenSubtract(value, 1, unit);
      if (isWhenValid(newWhen)) setValue(newWhen);
    }}
    onRight={() => {
      const newWhen = whenAdd(value, 1, unit);
      if (isWhenValid(newWhen)) setValue(newWhen);
    }}
  />
);

export default WhenValueLR;
