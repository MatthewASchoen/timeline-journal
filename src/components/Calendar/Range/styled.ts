import styled from 'styled-components';
import {
  FontScaleProps,
  boxSize,
  boxDefaultHighlightColor,
  scaleFont,
} from '../Month/styled';

export const RangeTimeline = styled.div<FontScaleProps>`
  //container-type: inline-size;
  ${scaleFont}
  display: flex;
  padding: 1rem;
  align-items: center;
  column-gap: 0.5em;
  grid-template-columns: repeat(5, min-content);
`;

export const HighlightLine = styled.div<{ highlightColor?: string }>`
  width: 1em;
  margin-inline: -0.5em;
  height: ${boxSize};
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background: ${({ highlightColor }) =>
    highlightColor || boxDefaultHighlightColor};
`;
