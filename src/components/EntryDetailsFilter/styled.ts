import styled, { css } from 'styled-components';
import LabelTextbox from '../../ui/LabelTextbox';
import { SplitDiv } from '../../ui/SplitDiv';

type ActiveHighlight = { active: boolean; highlight: string };

export const TextFilter = styled(LabelTextbox)<ActiveHighlight>`
  input {
    padding-block: 0.5rem;
  }
  ${({ active, highlight }) =>
    active &&
    css`
      input {
        border: 2px solid black;
        background: ${highlight};
        //margin: -1px;
      }
    `}
`;

export const CategoryAndLocation = styled(SplitDiv)<{ vertical?: boolean }>`
  height: fit-content;
  column-gap: 1rem;
  ${({ vertical }) =>
    vertical
      ? css`
          grid-template-rows: 1fr 1fr;
          row-gap: 0.5rem;
        `
      : css`
          grid-template-columns: 1fr 1fr;
        `}
`;

export const SelectFilter = styled.select<ActiveHighlight>`
  font-size: inherit;
  padding: 0.5rem 0.25rem;

  ${({ active, highlight }) =>
    active &&
    css`
      border: 2px solid black;
      background: ${highlight};
      margin: -1px;
    `}
`;
