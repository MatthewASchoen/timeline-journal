import styled, { css } from 'styled-components';
import { ButtonTray } from '../Button';
import { appFont } from '../../views/TimelineApp/styled';

const groupBorderThickness = '0.1875rem';
const groupBackground = 'aliceblue';

export const ShiftedDiv = styled.div``;

const labelPaddingY = '0.25rem';
const labelPaddingX = '0.5rem';
const labelBorderWidth = '3px';

const labelFontSize = '1.5rem';

export const GroupLabel = styled.span`
  position: absolute;
  //left: 0.5rem;
  //top: calc(-0.5em - ${labelPaddingY} - ${labelBorderWidth});
  transform: translate(0.5rem, -50%);
  font: ${labelFontSize} ${appFont};
  font-weight: bold;
  padding: ${labelPaddingY} ${labelPaddingX};
  white-space: nowrap;

  line-height: 1em;

  color: inherit;
  border: ${groupBorderThickness} solid black;
  background: lightcyan;
`;

export const GroupInner = styled.div`
  overflow: hidden auto;
  min-height: 0;
`;

type GroupBoxProps = {
  hasTopContent?: boolean;
  collapsed?: boolean;
};

export const GroupBox = styled.div<GroupBoxProps>`
  isolation: isolate;
  display: grid;
  position: relative;
  padding: ${({ hasTopContent }) =>
    hasTopContent ? '2rem 1rem 1rem' : '1rem'};
  margin: 1.2rem 0.5rem 0.5rem;
  border: ${groupBorderThickness} solid black;
  background: ${groupBackground};
  min-height: 0;
  color: black;

  ${({ collapsed }) =>
    collapsed &&
    css`
      height: 0;
      margin-top: 1.2rem;
      padding: 0 0 1.2rem;
      border-bottom: none;
      /* border-left: none;
      border-right: none; */
      border-inline-color: transparent;
      background: transparent;

      > ${GroupInner} {
        display: none !important;
      }
    `}
`;

export const TopRightButtons = styled(ButtonTray)`
  position: absolute;
  right: 0.5rem;
  top: 0;
  transform: translate(0, -50%);
  //top: calc(-0.5em - 3px);
  //font-size: ${labelFontSize};
`;

export const TabTray = styled.div`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 0.75rem;
  padding-inline: 0.75rem;
`;

export const Tab = styled.span<{ active: boolean }>`
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
  border: ${groupBorderThickness} solid black;
  background: ${groupBackground};
  padding: 0 0.5rem 0.25rem;
  white-space: nowrap;
  z-index: 1;

  ${({ active }) =>
    active &&
    css`
      border-bottom-color: ${groupBackground};
      font-weight: bold;
    `}

  &:hover {
    text-decoration: underline;
  }
`;

export const TabGroupContainer = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  padding: 1rem 1rem 0.5rem;
  min-height: 0;
  isolation: isolate;
`;

export const TabGroupBox = styled(GroupBox)`
  margin: -${groupBorderThickness} 0 0;
  min-height: 0;

  > ${GroupInner} {
    overflow-y: auto;
  }
`;
