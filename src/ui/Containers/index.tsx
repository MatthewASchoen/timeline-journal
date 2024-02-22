import styled, { css } from 'styled-components';

export const Stack = styled.div<{ gap?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  ${({ gap }) => gap && `row-gap: ${gap};`}
`;

export const CenteringStack = styled(Stack)<{ centerText?: boolean }>`
  ${({ centerText }) =>
    centerText &&
    css`
      justify-items: center;
    `}
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const CenteringDiv = styled.div`
  display: flex;
  justify-content: center;
`;
