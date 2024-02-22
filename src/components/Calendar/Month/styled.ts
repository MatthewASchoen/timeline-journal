import styled, { css } from 'styled-components';
import { appFont } from '../../../views/TimelineApp/styled';

const calendarBackground = 'floralwhite'; //'snow', 'oldlace', 'seashell';

//const scale = 6;
export const boxSizeScalar = 0.875;
export const boxSize = `${boxSizeScalar}em`;
export const calSizeScalar = 9 * boxSizeScalar;
export const calSize = `calc(${calSizeScalar}em + 8px)`;
//const calSize = boxSize * 9;

const bigBoxScalar = boxSizeScalar * 2;
const bigBoxSize = `${bigBoxScalar}em`;
export const bigCalScalar = 9 * bigBoxScalar;
const bigCalSize = `calc(${bigCalScalar}em + 8px)`;

// scale x fontScalar = font size (px)
// export const fontScalarPx = 2.5;
// const fontScalarRem = fontScalarPx / 16;

export const paddingScalar = 0.2;

export type FontScaleProps = { scale?: number };
export const scaleFont = ({ scale }: FontScaleProps) =>
  css`
    // scale === px value
    font-size: ${scale ? `${scale / 16}rem` : 'inherit'};
  `;

// A Container for a calendar year or month
export const CalendarBox = styled.div`
  font-family: ${appFont};

  width: ${calSize};
  height: ${calSize};
  //padding: ${paddingScalar}em;

  text-align: center;

  background: ${calendarBackground};
  border: 1px solid black;
  isolation: isolate; ///////////// may need to move up
  overflow: hidden;
`;

// A box with centered text signifying a year (no calendar)
export const YearBox = styled(CalendarBox)<FontScaleProps>`
  ${scaleFont}
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type BoxTextProps = {
  selected?: boolean;
  clickable?: boolean;
};

export const BoxText = styled.span<BoxTextProps>`
  color: black;
  font-weight: bold;

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}

  ${({ selected, clickable }) =>
    (selected &&
      css`
        text-decoration: underline;
      `) ||
    (clickable &&
      css`
        &:hover {
          text-decoration: underline;
        }
      `)}
`;

export const Space = styled.div`
  position: relative;
  background: ${calendarBackground};
  z-index: 1;
`;

type BoxProps = {
  open?: boolean;
  clickable: boolean;
  highlight: boolean;
  highlightColor?: string;
};

export const boxDefaultHighlightColor = 'lightgreen';
// A single box inside a calendar (1 day)
export const Box = styled.span<BoxProps>`
  width: ${boxSize};
  height: ${boxSize};

  font-weight: bold;
  text-align: center;
  user-select: none;
  line-height: ${bigBoxSize};
  // Hide text while closed
  color: transparent;

  // If open is true, keep open
  ${({ open }) =>
    open &&
    css`
      position: relative;
      margin: calc(-${boxSize} / 2 - 1px);
      border: 1px solid black;
      width: ${bigBoxSize};
      height: ${bigBoxSize};
      color: black;
      z-index: 2;
    `}

  &:hover {
    z-index: 3;
  }

  ${({ clickable, highlightColor, onMouseOver }) =>
    clickable &&
    css`
      cursor: pointer;
      ${!onMouseOver &&
      css`
        &:hover {
          background: ${highlightColor || boxDefaultHighlightColor};
        }
      `}
    `}

  //cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  background: ${({ highlight, highlightColor }) =>
    highlight ? highlightColor || boxDefaultHighlightColor : 'white'};
`;

// A 7-wide grid of boxes for a calendar
export const DateGrid = styled.div`
  // Width: boxes x 7 + in-between lines
  width: calc(${boxSize} * 7 + 6px);
  background: black;

  display: grid;
  grid-template-columns: repeat(7, ${boxSize});
  //grid-auto-rows: ${boxSize};
  gap: 1px;
  padding: 1px;
  margin: auto;
`;

interface MonthBoxProps extends FontScaleProps {
  startDay: number;
  daysInMonth: number;
}

// Box with month name and calendar grid
export const MonthBox = styled(CalendarBox)<MonthBoxProps>`
  ${scaleFont}
  display: grid;
  grid-template-rows: min-content 1fr;
  > ${BoxText} {
    padding-top: 0.4em;
  }

  &,
  * {
    transition: all 0.1s;
  }

  ${({ startDay, daysInMonth }) => {
    const minCells = startDay + daysInMonth;
    const cellsTall = Math.ceil(minCells / 7);
    const endCells = 7 - (minCells % 7);

    return css`
      > ${DateGrid} {
        // Height:boxes x height + in-between lines
        height: calc(${cellsTall} * ${boxSize} + ${cellsTall - 1}px);
        grid-template-rows: repeat(${cellsTall}, ${boxSize});

        > ${Space}:first-child {
          grid-column: span ${startDay};
          // Oversize by an extra pixel to cover weird visual glitches
          width: calc(${startDay} * ${boxSize} + ${startDay + 1}px);
          height: calc(${boxSize} + 2px);
          margin: -2px 0 0 -2px;
        }

        > ${Space}:last-child {
          grid-column: span ${endCells};
          // Oversize by an extra pixel to cover weird visual glitches
          width: calc(${endCells} * ${boxSize} + ${endCells + 1}px);
          height: calc(${boxSize} + 2px);
        }
      }

      &:hover {
        width: ${bigCalSize};
        height: ${bigCalSize};
        position: relative;
        // Boxes double in width but borders remain the same,
        // so shift by half the calendar size before borders
        margin: calc(-${calSizeScalar}em / 2);
        z-index: 3;

        > ${BoxText} {
          font-size: 2em;
        }

        > ${DateGrid} {
          width: calc(${bigBoxSize} * 7 + 6px);
          height: calc(${cellsTall} * ${bigBoxSize} + ${cellsTall - 1}px);
          grid-template-columns: repeat(7, ${bigBoxSize});
          grid-template-rows: repeat(${cellsTall}, ${bigBoxSize});

          > ${Space} {
            height: calc(${bigBoxSize} + 2px);

            &:first-child {
              width: calc(${startDay} * ${bigBoxSize} + ${startDay + 1}px);
            }
            &:last-child {
              width: calc(${endCells} * ${bigBoxSize} + ${endCells + 1}px);
            }
          }

          > ${Box} {
            color: black;
            width: ${bigBoxSize};
            height: ${bigBoxSize};
            border: none;
            margin: 0;
          }
        }
      }
    `;
  }}
`;
