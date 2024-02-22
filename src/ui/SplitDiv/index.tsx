import styled from 'styled-components';

export const SplitDiv = styled.div`
  height: 100%;
  display: grid;

  > * {
    min-width: 0;
    min-height: 0;
  }
`;

export const SplitDivX = styled(SplitDiv)`
  grid-template-columns: 1fr 1fr;
`;

export const SplitDivY = styled(SplitDiv)`
  grid-template-rows: 1fr 1fr;
`;
