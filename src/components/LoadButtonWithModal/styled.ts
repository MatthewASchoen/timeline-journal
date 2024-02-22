import { styled } from 'styled-components';
import { BaseButtonProps, buttonCss } from '../../ui/Button';

export const ButtonLabel = styled.label<BaseButtonProps>`
  ${buttonCss}
`;

export const FileInput = styled.input`
  display: none;
`;

// const saveHighlight = css`
//   background: gold;
//   box-shadow: 0 0 3px 1px gold;
// `;

// export const SaveButton = styled(Button)<{ highlight?: boolean }>`
//   ${({ highlight }) => highlight && saveHighlight}
// `;
