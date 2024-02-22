import styled, { css } from 'styled-components';
import { ClearableContainer } from '../ClearableInput/styled';

export const Label = styled.label``;

export const Textbox = styled.input.attrs({ type: 'text' })`
  font-size: inherit;
  padding-inline: 0.5rem;
`;

export const Container = styled.div<{ newline?: boolean }>`
  display: flex;
  gap: 0.5rem;
  min-width: 0;

  ${({ newline }) =>
    newline
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          align-items: center;
        `};

  ${ClearableContainer} {
    flex-grow: 1;
  }
`;
