import styled, { css } from 'styled-components';
import Group from '../../ui/Group';
import { GroupInner } from '../../ui/Group/styled';
import { Text } from '../../ui/Info';
import { ClickySpan } from '../../ui/ClickySpan/styled';
import { Label, Textbox } from '../../ui/LabelTextbox/styled';
import { InputLabelContainer } from '../../ui/InputLabel/styled';

const fontSize = '2rem';

export const SwatchContainer = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;
  column-gap: 0.5rem;
`;

export const FlexBox = styled.div`
  display: flex;
  column-gap: 0.5rem;
  white-space: nowrap;
  align-items: center;

  padding: 0.5rem;
  width: fit-content;

  > * {
    margin: 0;
  }
`;

export const PageContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: min-content auto;
  column-gap: 1rem;

  ${Text}, ${ClickySpan}, ${Label}, ${Textbox}, ${InputLabelContainer} {
    font-size: ${fontSize};
  }
`;

export const SwatchBox = styled.div<{ color: string; selected?: boolean }>`
  cursor: pointer;
  background-color: ${({ color }) => color};

  ${({ selected }) =>
    !selected
      ? css`
          height: 3rem;
          width: 3rem;
          border: 1px solid black;
        `
      : css`
          height: calc(3rem - 2px);
          width: calc(3rem - 2px);
          border: 2px solid black;
        `}
`;

export const SwatchGroup = styled(Group)`
  background: white;
  > ${GroupInner} {
    width: min-content;
    > div {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }
  }
`;

export const ExampleGroup = styled(Group)`
  background: white;
  > ${GroupInner} {
    display: grid;
    grid-template-columns: min-content auto;
    column-gap: 1rem;
    overflow-y: auto;

    > div {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      &:first-child > * {
        margin: 0;
      }
    }
  }
`;
