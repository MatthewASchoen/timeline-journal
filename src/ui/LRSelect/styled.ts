import styled from 'styled-components';

export const SelectBox = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: min-content auto min-content;
  column-gap: 0.25em;
`;

export const Arrow = styled.button`
  padding: 0;
  width: 1em;
  font: inherit;
  cursor: pointer;
  background: inherit;
  //border: 1px solid lightgray;
  border: none;
  &:hover,
  &:focus-visible {
    font-weight: bold;
    //background: powderblue;
  }
  user-select: none;
`;

const arrowRadius = '.75em';
export const ArrowLeft = styled(Arrow)`
  border-radius: ${arrowRadius} 0 0 ${arrowRadius};
`;

export const ArrowRight = styled(Arrow)`
  border-radius: 0 ${arrowRadius} ${arrowRadius} 0;
`;

export const Value = styled.span`
  height: fit-content;
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
  padding: 0.25em 0;
`;
