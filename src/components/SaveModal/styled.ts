import styled from 'styled-components';
import Group from '../../ui/Group';
import { GroupInner, GroupLabel } from '../../ui/Group/styled';
import { ModalSubtitle } from '../../ui/CenteredModal';
import { Label, Textbox } from '../../ui/LabelTextbox/styled';

export const FilenameBox = styled(Textbox)`
  border-color: ${({ value }) => (value ? 'black' : 'red')};
`;

export const FilenameBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: min-content auto max-content;
  column-gap: 0.25rem;
  font-size: 1.5rem;

  > ${Label} {
    font-weight: bold;
    padding-right: 0.25rem;
  }
`;

export const FilterGroup = styled(Group)`
  width: 50rem;
  &,
  > ${GroupLabel} {
    background: white;
  }

  > ${GroupInner} {
    height: 30rem;
    font-size: 1.4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
`;

export const ListWithHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  min-height: 0;

  > *:last-child {
    flex-grow: 1;
  }
`;

export const SummaryAndButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
`;

export const SaveSummary = styled(ModalSubtitle)`
  font-style: italic;
  color: darkblue;
  text-align: center;
  font-size: 1.4rem;
`;
