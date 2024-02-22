import styled, { css } from 'styled-components';
import { ButtonProps, buttonCss } from '../Button';

const highlighted = 'royalblue';
const activeUnfocused = '#d7dce5';

interface MenuItemProps extends ButtonProps {
  root?: boolean;
  dataOpen?: boolean;
  dataNested?: boolean;
  dataFocusInside?: boolean;
}

export const MenuItem = styled.button<MenuItemProps>`
  ${({ root, dataOpen, dataNested, dataFocusInside }) =>
    !root
      ? css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          width: 100%;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          text-align: left;
          line-height: 1.8;
          min-width: 110px;
          margin: 0;
          outline: 0;

          &:focus {
            background: ${highlighted};
            color: white;
          }

          ${dataNested &&
          dataOpen &&
          !dataFocusInside &&
          css`
            background: ${highlighted};
            color: white;
          `}

          ${dataOpen &&
          dataFocusInside &&
          css`
            background: ${activeUnfocused};
          `}
        `
      : css`
          /* padding: 6px 14px;
          border: none;
          font-size: 16px;
          background: none;
          border-radius: 6px;
          border: 1px solid ${activeUnfocused};

          &:hover {
            ${dataOpen &&
          css`
            background: ${activeUnfocused};
          `}
          } */

          ${buttonCss}
        `}
`;

export const Menu = styled.div`
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 4px;
  border-radius: 6px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
  outline: 0;
`;
