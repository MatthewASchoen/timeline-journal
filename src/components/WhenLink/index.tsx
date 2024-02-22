import { When, whenString } from '../../types/when';
import { LinkSpan, LinkSpanProps } from '../../ui/ClickySpan';

export interface WhenLinkProps extends LinkSpanProps {
  value: When;
  setValue?: (value: When) => void;
}

const WhenLink = ({
  value,
  setValue,
  children,
  ...props
}: WhenLinkProps): JSX.Element => (
  <LinkSpan onClick={setValue && (() => setValue(value))} {...props}>
    {children || whenString(value)}
  </LinkSpan>
);

export default WhenLink;
