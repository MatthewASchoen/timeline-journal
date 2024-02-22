import styled, { css } from 'styled-components';
import { SplitDiv } from '../../ui/SplitDiv';
import Group, { GroupWithButtons } from '../../ui/Group';
import { appFont } from '../TimelineApp/styled';
import { GroupInner, GroupLabel } from '../../ui/Group/styled';

export const DetailsAndTimeline = styled(SplitDiv)`
  // height: 100vh;
  grid-template-rows: min-content min-content;
  justify-items: center;
`;

export const InfoContainer = styled(GroupWithButtons)`
  width: fit-content;
  height: fit-content;

  > ${GroupInner} {
    row-gap: 1rem;
    //height: 100%;
    font: 2rem ${appFont};
  }
`;

export const EntryDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameLine = styled.h4`
  margin: 0;
  display: inline;
`;

export const TimelineGroup = styled(Group)<{ bigLabel: boolean }>`
  width: max-content;
  > ${GroupInner} {
    display: grid;
    justify-content: center;
    overflow: unset;
  }

  ${({ bigLabel }) =>
    bigLabel
      ? css`
          > ${GroupLabel} {
            font-size: 1.2rem;
          }
        `
      : ''}
`;

export const SelectEntryMessage = styled.span`
  display: block;
  padding-block: 15vh;
  font-size: 1.5rem;
`;
