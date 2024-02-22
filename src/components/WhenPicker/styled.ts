import styled, { css } from 'styled-components';
import { appFont } from '../../views/TimelineApp/styled';

export const Picker = styled.div`
  display: grid;
  row-gap: 0.25em;
  grid-template-columns: 1fr;
  padding: 0.5em;
  width: fit-content;

  background: white;
  color: black;
  border: 1px solid gray;
  font-family: ${appFont};
  font-size: 20px;
`;

export const UnitLabelBox = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 1em;
  padding: 0.5em;
`;

export const Unit = styled.button<{ selected: boolean }>`
  font: inherit;

  ${({ selected }) => css`
    padding: ${selected ? 0.25 : 0.125}em ${selected ? 0.75 : 0.375}em;

    ${selected &&
    css`
      margin: -0.125em;
      font-size: 1.5em;
      font-weight: bold;
      border: 1px solid black;
      border-radius: 0.125em;
      background: lemonchiffon;
    `}
    ${!selected && 'cursor: pointer;'}
  `}
`;

export const CalendarDisplay = styled.div`
  display: grid;
  column-gap: 1em;
  grid-template-columns: auto min-content;
`;

export const Selects = styled.div`
  display: grid;
  width: 10em;
  margin: auto;
  grid-template-columns: 1fr;
  row-gap: 0.5em;
`;
