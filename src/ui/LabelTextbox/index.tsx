import ClearableInput from '../ClearableInput';
import * as S from './styled';

interface LabelTextboxProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  newline?: boolean;
  suggestions?: string[];
}

const LabelTextbox = ({
  id,
  label,
  value,
  setValue,
  inputProps,
  newline,
  suggestions,
  ...rest
}: LabelTextboxProps): JSX.Element => (
  <S.Container newline={newline} {...rest}>
    <S.Label htmlFor={id}>{label}</S.Label>
    <ClearableInput onClear={() => setValue('')}>
      <S.Textbox
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
        list={suggestions && `${id}-suggestions`}
        {...inputProps}
      />
      {suggestions && (
        <datalist id={`${id}-suggestions`}>
          {suggestions.map(value => (
            <option>{value}</option>
          ))}
        </datalist>
      )}
    </ClearableInput>
  </S.Container>
);

export default LabelTextbox;
