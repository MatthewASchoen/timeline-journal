import * as S from './styled';
import { When, WhenUnit } from '../../types/when';
import { CalendarMonth } from '../Calendar';
import WhenValueLR from '../WhenValueLR';

type WhenPickerProps = {
  id: string;
  value: When;
  setValue: (when: When) => void;
};

const WhenPicker = ({ id, value, setValue }: WhenPickerProps): JSX.Element => {
  const { unit } = value;

  const changeUnit = (newUnit: WhenUnit) => () =>
    newUnit !== unit && setValue({ ...value, unit: newUnit });

  return (
    <S.Picker>
      <S.UnitLabelBox>
        <S.Unit selected={unit === 'year'} onClick={changeUnit('year')}>
          Year
        </S.Unit>
        <S.Unit selected={unit === 'month'} onClick={changeUnit('month')}>
          Month
        </S.Unit>
        <S.Unit selected={unit === 'day'} onClick={changeUnit('day')}>
          Day
        </S.Unit>
      </S.UnitLabelBox>
      <S.CalendarDisplay>
        <S.Selects>
          <WhenValueLR value={value} setValue={setValue} unit="year" />
          {unit !== 'year' && (
            <WhenValueLR value={value} setValue={setValue} unit="month" />
          )}
          {unit === 'day' && (
            <WhenValueLR value={value} setValue={setValue} unit="day" />
          )}
        </S.Selects>
        <CalendarMonth id={id} value={value} />
      </S.CalendarDisplay>
    </S.Picker>
  );
};

export default WhenPicker;
