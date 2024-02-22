import styled, { css } from 'styled-components';

const infoFontSize = '1.4rem';

export const Info = styled.p`
  font-size: ${infoFontSize};
  margin: 0;
`;

export const InfoHeader = styled.h2`
  text-decoration: underline;
  margin: 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export type StyledTextProps = {
  i?: boolean;
  b?: boolean;
  u?: boolean;
  color?: string;
  back?: string;
};

export const Text = styled.span<StyledTextProps>`
  ${({ i, b, u, color, back }) => css`
    ${i &&
    css`
      font-style: italic;
    `}

    ${b &&
    css`
      font-weight: bold;
    `}

    ${u &&
    css`
      text-decoration: underline;
    `}
    
    ${color &&
    css`
      color: ${color};
    `}

    ${back &&
    css`
      background: ${back};
      padding-inline: 0.25rem;
    `}
  `}
`;

export const B = styled(Text).attrs({ b: true })``;
export const I = styled(Text).attrs({ i: true })``;
export const U = styled(Text).attrs({ u: true })``;
