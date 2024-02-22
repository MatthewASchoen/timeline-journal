import { useState } from 'react';

export interface ValidatorInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  isValid: (value: string) => boolean;
}

// An input that calls onChange only if a validator check is passed.
// Exiting the input with an invalid value will revert to given value
const ValidatorInput = ({
  value,
  onChange,
  isValid,
  ...props
}: ValidatorInputProps): JSX.Element => {
  const [text, setText] = useState(value);

  return (
    <input
      {...props}
      value={text}
      onChange={e => {
        setText(e.target.value);
        if (e.target.value !== value && isValid(e.target.value)) onChange?.(e);
      }}
      onBlur={e => {
        if (text !== value) setText(value);
        props.onBlur?.(e);
      }}
    />
  );
};

export default ValidatorInput;
