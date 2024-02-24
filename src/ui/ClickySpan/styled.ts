import styled, { css } from 'styled-components';

export interface StyledClickySpanProps
  extends Pick<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  linkLike?: boolean;
  strikethrough?: boolean;
}

export const ClickySpan = styled.span<StyledClickySpanProps>`
  ${({ onClick, linkLike, strikethrough }) =>
    onClick &&
    css`
      cursor: pointer;
      //user-select: none;
      &:hover,
      &:focus {
        ${linkLike &&
        css`
          text-decoration: underline !important;
        `}
        ${strikethrough &&
        css`
          text-decoration: line-through;
          outline: none;
        `}
      }
    `}
`;
