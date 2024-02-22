import styled from 'styled-components';

export const appFont = 'Calibri, Helvetica, sans-serif';

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: lightblue;
  overflow: clip;

  * {
    font-family: ${appFont};
  }

  > div {
    height: 100vh;
  }
`;
