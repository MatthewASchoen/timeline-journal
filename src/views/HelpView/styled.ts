import styled from 'styled-components';
import { ButtonTray } from '../../ui/Button';
import { SplitDivX } from '../../ui/SplitDiv';
import { Section } from '../../ui/Info';

export const HelpViewContainer = styled.div`
  display: grid;
  grid-template-rows: auto min-content;

  > ${ButtonTray} {
    padding: 0 1rem 0.5rem;
  }
`;

export const HelpContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1rem;
`;

export const HelpList = styled.ul`
  margin: 0;
  padding: 0.5rem 0 0.5rem 2rem;

  > li {
    padding-block: 0.5rem;
  }
`;

export const SplitInfo = styled(SplitDivX)`
  > ${Section} {
    padding-block: 1rem;

    &:first-child {
      padding-inline: 1rem 3rem;
      border-right: 1px solid black;
    }

    &:last-child {
      padding-inline: 3rem 1rem;
      border-left: 1px solid black;
    }
  }
`;
