import { ClickySpan } from '../ClickySpan';
import { confirmKeys } from '../keys';
import { PlusButton, XButton } from './XButton';
import * as S from './styled';

export interface ClearableInputProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  onClear: () => void;
  plus?: boolean;
}

const ClearableInput = ({
  onClear,
  children,
  plus,
  ...rest
}: ClearableInputProps): JSX.Element => {
  const Button = plus ? PlusButton : XButton;
  return (
    <S.ClearableContainer {...rest}>
      {children}
      <Button
        tabIndex={0}
        onClick={onClear}
        onKeyDown={({ key }) => confirmKeys.includes(key) && onClear()}
      />
    </S.ClearableContainer>
  );
};

export const ClearableClicky = ({
  children,
  ...props
}: ClearableInputProps): JSX.Element => (
  <ClearableInput {...props}>
    <ClickySpan onClick={props.onClear} strikethrough>
      {children}
    </ClickySpan>
  </ClearableInput>
);

export default ClearableInput;
