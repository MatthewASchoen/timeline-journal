import styled, { css } from 'styled-components';

export type BaseButtonProps = {
  wrap?: boolean;
  disableGrow?: boolean;
  forceGrow?: boolean;
  disablePress?: boolean;
  highlight?: { color: string; glow?: string };
  disabled?: boolean;
};

const growScale = 'scale(1.05)';
const pressTranslate = 'translateY(0.125rem)';
export const growCss = css`
  transform: ${growScale};
`;
const pressCss = css`
  transform: ${pressTranslate};
`;
const growAndPressCSS = css`
  transform: ${growScale} ${pressTranslate};
`;

export const buttonCss = css<BaseButtonProps>`
  background: #fff;
  backface-visibility: hidden;
  border-radius: 0.2rem;
  border-style: solid;
  border-width: 0.125rem;
  box-sizing: border-box;
  color: #212121;
  display: inline-block;
  font-family: Circular, Helvetica, sans-serif;
  font-size: inherit; // 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  padding: 0.125rem 0.25rem;
  margin: 0.1rem; // margin: 0.1rem 0.1rem 0.2rem;
  position: relative;
  //text-align: center;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  cursor: pointer;

  ${({ wrap }) =>
    !wrap &&
    css`
      white-space: nowrap;
    `}

  ${({ disableGrow, disablePress, forceGrow }) =>
    (!disableGrow || !disablePress) &&
    css`
      &:not(:disabled) {
        ${!disableGrow &&
        // Make the button grow if it's hovered, focused, or forceGrow is true
        (forceGrow
          ? growCss
          : css`
              &:hover,
              &:focus {
                ${growCss}
              }
            `)}

        ${!disablePress &&
        css`
          // Make the button press down if it's clicked
          &:active {
            ${disableGrow ? pressCss : growAndPressCSS}
          }
        `}
      }
    `}

  &:focus {
    outline: 2px solid green;
  }

  &:focus:before {
    content: '';
    left: calc(-1 * 0.375rem);
    pointer-events: none;
    position: absolute;
    top: calc(-1 * 0.375rem);
    transition: border-radius;
    user-select: none;
  }

  &:focus:not(:focus-visible) {
    outline: 0 solid transparent;
  }

  &:focus:not(:focus-visible):before {
    border-width: 0;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ highlight }) =>
    highlight &&
    css`
      background: ${highlight.color};
      ${highlight.glow &&
      css`
        box-shadow: 0 0 3px 1px ${highlight.glow};
      `}
    `}
`;

export const StyledButton = styled.button<BaseButtonProps>`
  ${buttonCss}
`;
