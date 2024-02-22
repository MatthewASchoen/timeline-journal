import styled, { css } from 'styled-components';
import { FontScaleProps, calSize, scaleFont } from '../Month/styled';

const yearCalendarGapScalar = 0.5;
export const yearCalendarGap = `${yearCalendarGapScalar}em`;
// A grid of 12 calendars signifying a year
export const FullYear = styled.div<FontScaleProps>`
  ${scaleFont}
  width: min-content;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${yearCalendarGap};
  padding: ${yearCalendarGap};
  border: 1px solid black;
  background: lightsteelblue;

  ${({ scale }) =>
    scale &&
    css`
      @container (max-width: calc(${calSize} * 4 + (${yearCalendarGap} + 2px) * 5)) {
        grid-template-columns: repeat(3, 1fr);
      }
    `}
`;
