import styled, { css } from 'styled-components';
import ValidatorInput from '../../../ui/ValidatorInput';
import { ButtonTray, StyledButton } from '../../../ui/Button';
import { FontScaleProps, calSize, scaleFont } from '../Month/styled';
import { yearCalendarGap } from '../Year/styled';
import { Arrow } from '../../../ui/LRSelect/styled';

export const PickerContainer = styled.div<FontScaleProps>`
  container-type: inline-size;
  ${scaleFont}
  display: grid;
  grid-template-columns: auto;
  row-gap: 0.25em;
  justify-content: center;
  //width: fit-content;
  min-width: calc(${calSize} * 3 + (${yearCalendarGap} + 2px) * 4);
  z-index: 1;

  /* > ${ButtonTray} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem 0.5rem 0;
    column-gap: 0.75rem;

    > *:first-child:last-child {
      grid-column: span 2;
    }
  } */
`;

export const PickerCalendarRow = styled.div<FontScaleProps>`
  container-type: inline-size;
  ${scaleFont}
  display: flex;
  //justify-content: center;
  width: min-content;
`;

const yearCss = css`
  width: 2.5em;
  //height: 1.3em;
  text-align: center;
  padding: 0;
  font: inherit;
  background: transparent;
`;

export const YearDisplay = styled.span<{ selected: boolean }>`
  ${yearCss}
  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }

  ${({ selected }) =>
    selected &&
    css`
      text-decoration: underline;
    `}
`;

export const YearInput = styled(ValidatorInput)`
  border: none;
  ${yearCss}
  margin-inline: 1rem;
`;

export const PickerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  > div:first-child {
    font-size: 1.5em;
    padding-bottom: 0.25em;
  }
`;

export const PickerYearAndArrows = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > ${Arrow} {
    font-size: 2em;
    /* &:first-child {
      margin-right: 0.25rem;
    }
    &:last-child {
      margin-left: 0.25rem;
    } */
  }

  > ${YearDisplay}, > ${YearInput} {
    font-size: 3em;
  }

  > ${StyledButton} {
    font-size: 2em;
    background: transparent;
    border: none;
    margin-left: -0.25em;
    color: gray;
  }

  &,
  > * {
    height: 3rem;
    line-height: 3rem;
  }
`;

export const PickerFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 1.5em;
  padding-top: 0.5rem;
`;
