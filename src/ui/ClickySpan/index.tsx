import { onKeys } from '../keys';
import * as S from './styled';
import { AsProp } from '../types';

export interface ClickySpanProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    S.StyledClickySpanProps {
  as?: AsProp;
  onClick?: () => void;
  noTab?: boolean;
}

export const ClickySpan = ({
  noTab,
  ...props
}: ClickySpanProps): JSX.Element => (
  <S.ClickySpan
    {...props}
    tabIndex={props.onClick && !noTab ? 0 : undefined}
    onKeyDown={props.onClick && onKeys({ confirm: props.onClick })}
  />
);

export type LinkSpanProps = Omit<ClickySpanProps, 'linkLike'>;

export const LinkSpan = (props: LinkSpanProps): JSX.Element => (
  <ClickySpan {...props} linkLike />
);
