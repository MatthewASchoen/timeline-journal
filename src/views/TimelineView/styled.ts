import styled, { css } from 'styled-components';
import { SplitDivX } from '../../ui/SplitDiv';
import Group from '../../ui/Group';
import { ClickySpan } from '../../ui/ClickySpan';
import { ButtonTray, StyledButton } from '../../ui/Button';
import { appFont } from '../TimelineApp/styled';
import { GroupInner } from '../../ui/Group/styled';
import { filterHighlight } from './TimelineFilterPanel';

export const FiltersAndEntries = styled(SplitDivX)`
  //justify-content: center;
  //grid-template-columns: auto auto;
`;

export const FilterPanel = styled(Group)`
  > ${GroupInner} {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    font-size: 1.5rem;
    overflow: hidden auto;

    ${StyledButton} {
      &:not(:disabled) {
        border-color: darkgray;
        //color: darkgray;
      }

      &:disabled {
        color: gray;
      }
    }
  }
`;

export const AllTimeRow = styled.div`
  display: flex;
  // In case I want to put something right of the All Time button
  justify-content: space-between;
  margin-bottom: -1.5rem;
`;

export const FilteredListGrid = styled(Group)<{ gridCols: string }>`
  > ${GroupInner} {
    display: grid;
    //grid-auto-rows: 33%;
    ${({ gridCols }) =>
      css`
        grid-template-rows: ${gridCols};
      `}
  }

  > ${GroupInner}, > ${GroupInner} > div {
    min-height: 0;
    min-width: 0;
  }
`;

export const ScrollGroup = styled(Group)`
  ${({ collapsed }) =>
    !collapsed &&
    css`
      background: white;
    `}
  > ${GroupInner} {
    overflow-y: scroll;
  }
  // transition: height 1s;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.25em;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
`;

const selectColor = 'gold';

export const EntryListItem = styled.li<{ selected: boolean }>`
  display: grid;
  grid-template-columns: auto min-content;
  font: 1.5rem ${appFont};
  margin: 0.25em;
  padding-inline: 0.25rem;
  border-bottom: 1px solid black;

  ${ButtonTray} {
    opacity: 0;
    font-size: 1.5rem;

    > span:hover {
      font-weight: bold;
    }
  }

  &:hover > ${ButtonTray}, > span:focus + ${ButtonTray} {
    opacity: 1;
  }

  ${({ selected }) =>
    selected
      ? `background: ${selectColor};`
      : css`
          &:hover {
            background: ${filterHighlight};
          }
        `}
`;

export const ColorSpan = styled.span<{ color: string }>`
  font-weight: bold;
  color: ${({ color }) => color};
`;

export const NoEntriesGroup = styled(Group)`
  background: white;
  > ${GroupInner} > * {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
