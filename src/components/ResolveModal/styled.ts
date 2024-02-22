import styled, { css } from 'styled-components';

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ResolveGrid = styled.div`
  width: 40rem;
  display: grid;
  grid-template-columns: auto 1fr 1fr;
`;

export const GridCell = styled.div<{ empty?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  padding: 0.5rem;

  ${({ empty }) =>
    empty &&
    css`
      label,
      span {
        font-style: italic;
      }
    `}
`;

export const GridHeader = styled(GridCell)<{ left?: boolean }>`
  //border: none;
  //${({ left }) => css`border-${left ? 'right' : 'left'}: 1px solid gray;`}
`;

export const DoubleGridCell = styled(GridCell)`
  grid-column: span 2;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  gap: 1rem 3rem;
  margin: auto;
  font-size: 1.5rem;
  > span {
    white-space: nowrap;
  }
`;
