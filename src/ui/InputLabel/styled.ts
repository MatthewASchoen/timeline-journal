import styled, { css } from 'styled-components';
import { TwoColumns } from '../Containers';

export const InputLabelContainer = styled.div<{
  disabled?: boolean;
  color?: string;
}>`
  display: flex;
  gap: 0.25em;
  align-items: center;

  // TODO: Fix disabled: doesn't work
  ${({ disabled }) =>
    !disabled
      ? css`
          > * {
            cursor: pointer;
          }
          > label:hover,
          > input:hover + label {
            text-decoration: underline;
          }
        `
      : css`
          color: #c6c6c6;
        `}

  > input {
    width: 1.5em;
    height: 1.5em;
    ${({ color }) =>
      color &&
      css`
        accent-color: ${color};
      `}
  }

  > label {
    user-select: none;
  }
`;

export const RadioPair = styled(TwoColumns)`
  width: fit-content;
  border: 2px solid gray;
  border-radius: 1rem;

  > div {
    justify-content: center;
    padding: 0.5rem;
  }

  > div:first-child {
    border-right: 1px solid gray;
  }

  > div:last-child {
    border-left: 1px solid gray;
  }
`;
