import styled from 'styled-components';

const size = '0.8em';
const PlusSpan = styled.span`
  display: inline-block;
  width: ${size};
  height: ${size};
  position: relative;
  cursor: pointer;
  &:hover > div:first-child {
    background-color: darkgray;
  }
`;

const XSpan = styled(PlusSpan)`
  transform: rotate(45deg);
`;

const XCircle = styled.div`
  position: absolute;
  width: ${size};
  height: ${size};
  background-color: lightgray;
  border-radius: 50%;
  left: 0;
  top: 0;
  //border: 1px solid black;
`;

// Cross stem size
const xthick = '0.08em';
const xlong = '0.5em';
const XStem1 = styled.div`
  position: absolute;
  background-color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${xthick};
  height: ${xlong};
`;

const XStem2 = styled(XStem1)`
  width: ${xlong};
  height: ${xthick};
`;

export const PlusButton = (
  props: React.HtmlHTMLAttributes<HTMLSpanElement>
): JSX.Element => (
  <PlusSpan {...props}>
    <XCircle />
    <XStem1 />
    <XStem2 />
  </PlusSpan>
);

export const XButton = (
  props: React.HtmlHTMLAttributes<HTMLSpanElement>
): JSX.Element => (
  <XSpan {...props}>
    <XCircle />
    <XStem1 />
    <XStem2 />
  </XSpan>
);
