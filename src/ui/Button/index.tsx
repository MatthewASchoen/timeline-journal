import React from 'react';
import styled, { css } from 'styled-components';
import * as S from './styled';
import { useTimedPulse } from '../../utility/useTimedPulse';
export * from './styled';

type ButtonHTMLProps = S.BaseButtonProps &
  React.HTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends ButtonHTMLProps {
  pulse?: boolean;
}

/** Returns massaged ButtonProps that include the ability to pulse */
export const useButtonProps = ({
  pulse,
  ...rest
}: ButtonProps = {}): ButtonHTMLProps => {
  const pulseGrow = useTimedPulse(!!pulse);
  rest.forceGrow ||= pulseGrow;
  return rest;
};

/** A styled button that grows slightly when hovered/focused and depresses when clicked. */
export const Button = (props: ButtonProps): JSX.Element => (
  <S.StyledButton {...useButtonProps(props)} />
);

/** A container for one or more adjacent buttons */
export const ButtonTray = styled.div<{ right?: boolean; stack?: boolean }>`
  display: flex;
  gap: 0.3rem;
  font-size: 1rem;
  align-items: center;
  //padding: 0.25rem;
  ${({ right }) =>
    right &&
    css`
      justify-content: end;
    `}
  ${({ stack }) =>
    stack &&
    css`
      flex-direction: column;
      align-items: end;
    `}
`;

export const RoundButton = styled(Button)`
  border-radius: 50%;
`;
