import styled from 'styled-components';
import { ButtonTray } from '../../ui/Button';
import ClearableInput from '../../ui/ClearableInput';

export const SelectListContainer = styled.div`
  min-height: 0;
  display: grid;
  grid-template-rows: auto min-content;
  border: 1px solid black;
  padding: 0.5rem;
`;

export const SelectList = styled.ul`
  //height: 10rem;
  padding: 0;
  margin: 0.5rem;
  overflow-y: auto;

  span:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SelectListItem = styled(ClearableInput)`
  border-bottom: 1px solid black;
  margin: 0.25rem 0.25rem 0.25rem 0;
  padding-inline: 0.25rem;
  user-select: none;

  &:hover,
  &:focus {
    background-color: ${({ plus }) => (plus ? '#D9F4E0' : '#F6DFDA')};
  }
`;

export const SelectListButtons = styled(ButtonTray)``;
