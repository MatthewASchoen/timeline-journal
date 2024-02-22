import styled, { css } from 'styled-components';

export const Label = styled.span<{ clickable: boolean }>`
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    `}
`;
