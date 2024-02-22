import { ReactNode } from 'react';
import * as S from './styled';

interface InputLabelProps extends React.InputHTMLAttributes<HTMLDivElement> {
  type: 'radio' | 'checkbox';
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}

const InputLabel = ({
  id,
  label,
  checked,
  onChange,
  type,
  ...rest
}: InputLabelProps): JSX.Element => (
  <S.InputLabelContainer {...rest}>
    <input
      type={type}
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={rest.disabled}
    />
    <label htmlFor={id}>{label}</label>
  </S.InputLabelContainer>
);

type CheckLabelProps = Omit<InputLabelProps, 'type'>;

export const RadioLabel = (props: CheckLabelProps): JSX.Element => (
  <InputLabel type="radio" {...props} />
);

export const CheckboxLabel = (props: CheckLabelProps): JSX.Element => (
  <InputLabel type="checkbox" {...props} />
);
