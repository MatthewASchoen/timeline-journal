import styled from 'styled-components';
import { SplitDiv } from '../ui/SplitDiv';
import { When, newWhen, whenString } from '../types/when';
import { CalendarMonth } from '../components/Calendar/Month';
import { calSizeScalar, paddingScalar } from '../components/Calendar/Month/styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Scales = styled.div`
  display: flex;
  column-gap: 1em;
`;

const CalBox = styled(SplitDiv)`
  position: relative;
  height: fit-content;
  border: 1px solid black;
  padding: 0.25em;
  grid-template-columns: 1fr;
  row-gap: 0.5em;
  > span {
    width: min-content;
    white-space: nowrap;
  }

  > * {
    margin: 0 auto;
  }
`;

type ScaleTestProps = {
  when?: When;
  min?: number;
  max?: number;
};
export const ScaleTest = ({
  when = newWhen(),
  min = 8,
  max = 24,
}: ScaleTestProps): JSX.Element => (
  <Container>
    <Scales>
      {Array.from({ length: max - min + 1 }, (_, i) => {
        const scale = i + min;
        const width = Math.round(
          scale * (calSizeScalar + paddingScalar * 2) + 2
        );

        return (
          <CalBox>
            <span>Scale: {scale}</span>
            <CalendarMonth
              key={`scale-test-${i}`}
              id={`scale-test-${i}`}
              scale={scale}
              value={when}
              onClick={val => alert(whenString(val))}
            />
            <span>Font: {scale}px</span>
            <span>Width: {width}px</span>
          </CalBox>
        );
      })}
    </Scales>
    <span>
      Width: scale x {calSizeScalar + paddingScalar * 2} + 2
    </span>
  </Container>
);
