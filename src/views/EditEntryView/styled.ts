import styled from 'styled-components';
import { SplitDivX } from '../../ui/SplitDiv';
import { ButtonTray } from '../../ui/Button';
import { Stack, TwoColumns } from '../../ui/Containers';
import LabelTextbox from '../../ui/LabelTextbox';
import Group, { GroupWithButtons } from '../../ui/Group';
import { ClearableContainer } from '../../ui/ClearableInput/styled';
import { ClickySpan } from '../../ui/ClickySpan/styled';
import { GroupInner } from '../../ui/Group/styled';

export const whenPickerHighlight = 'lawngreen';

export const BigLeftSplitDiv = styled(SplitDivX)`
  grid-template-columns: 2fr 1fr;
`;

export const EntryFormContainer = styled.div`
  display: grid;
  //grid-template-rows: auto min-content;
  height: 100vh;
  justify-content: center;

  > ${ButtonTray} {
    padding: 0 0.5rem 0.25rem;
  }
`;

export const WhenAndDetails = styled(SplitDivX)`
  //grid-template-columns: auto auto;
  min-height: 0;
  font-size: 1.4rem;
  > div {
    min-height: 0;
  }
`;

export const WhenGroup = styled(Group)`
  > ${GroupInner} {
    overflow-y: auto;
    overflow-x: clip;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > ${ButtonTray} {
      padding-right: 0.5rem;
      padding-bottom: 0.25rem;
    }
  }
`;

export const WhenPickerContainer = styled(Stack)`
  font-size: 1.5rem;
  row-gap: 2rem;
`;

// export const SummaryStack = styled(Stack).attrs({ gap: '1rem' })`
//   padding: 0.25rem;
//   > * {
//     margin: auto;
//   }
// `;

export const SummaryText = styled.span`
  display: flex;
  column-gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  align-items: center;
  border: 0.2rem solid black;
  background: white;
  margin: auto;

  ${ClearableContainer} {
    ${ClickySpan} {
      padding: 0.25rem 0.5rem;
      margin-right: -0.25rem;
      background: ${whenPickerHighlight};
    }
  }

  span {
    white-space: nowrap;
  }
`;

export const SummaryRange = styled.div`
  display: flex;
  column-gap: 0.5rem;
  /* ${ClickySpan} {
    padding-inline: 0.25rem;
    background: ${whenPickerHighlight};
  } */
`;

// export const SelectedText = styled.span`
//   font-weight: bolder;
//   background: ${whenPickerHighlight};
//   padding: 0.25rem 0.5rem;
// `;

export const SubText = styled.div`
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  font-style: italic;
`;

export const DetailsGroup = styled(GroupWithButtons)`
  input[type='text'],
  textarea {
    padding: 0.5rem;
    min-width: 0;
  }
`;

export const NoteGroup = styled(Group)`
  > ${GroupInner} {
    display: flex;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  min-width: 0;

  > ${NoteGroup} {
    flex-grow: 1;
  }
`;

export const NameInput = styled(LabelTextbox)``;

export const CatAndLoc = styled(TwoColumns)`
  column-gap: 1rem;
  min-width: 0;
`;

export const NoteBox = styled.textarea`
  font-size: inherit;
  resize: none;
  flex-grow: 1;
`;
