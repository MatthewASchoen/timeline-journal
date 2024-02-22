import styled from 'styled-components';
import { HTMLAttributes } from 'react';
import { useTimedPulse } from '../../utility/useTimedPulse';
import { growCss } from '../Button';
import { StyledTextProps, Text } from '.';

const GrowText = styled(Text)<{ forceGrow: boolean }>`
  display: inline-block;
  transform: translateZ(0) scale(1);
  transition: transform 0.2s;
  ${({ forceGrow }) => forceGrow && growCss}
`;

export const PulseyText = (
  props: StyledTextProps & HTMLAttributes<HTMLSpanElement>
): JSX.Element => <GrowText {...props} forceGrow={useTimedPulse(true)} />;
