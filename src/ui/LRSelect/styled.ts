import styled, { css } from 'styled-components';

export const SelectBox = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: min-content auto min-content;
  column-gap: 0.25em;
`;

type ArrowProps = {
  direction: 'up' | 'down' | 'right' | 'left';
  flip?: boolean;
};

const arrowRadius = '.75em';
const arrowBorderRadius = ({ direction }: ArrowProps) => css`
  border-radius: ${[
    direction === 'left' || direction === 'up',
    direction === 'up' || direction === 'right',
    direction === 'right' || direction === 'down',
    direction === 'down' || direction === 'left',
  ]
    .map(b => (b ? arrowRadius : '0'))
    .join(' ')};
`;

export const Arrow = styled.button<ArrowProps>`
  display: flex;
  padding: 0;
  width: 1em;
  justify-content: center;
  font: inherit;
  cursor: pointer;
  background: transparent;
  //border: 1px solid lightgray;
  border: none;
  &:hover,
  &:focus-visible {
    font-weight: bold;
    //background: powderblue;
  }
  user-select: none;
  transition: transform 250ms;
  ${({ flip }) =>
    flip &&
    css`
      transform: rotate(180deg);
    `}

  ${arrowBorderRadius}
`;

export const Value = styled.span`
  height: fit-content;
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
  padding: 0.25em 0;
`;
