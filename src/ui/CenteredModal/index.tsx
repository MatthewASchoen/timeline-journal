import Modal, { Props as ModalProps } from 'react-modal';
import { CenteringStack } from '../Containers';

export * from './styled';

const overlayGray = 100;
const overlayOpacity = 0.9;
const overlayTint = `rgba(${[
  overlayGray,
  overlayGray,
  overlayGray,
  overlayOpacity,
]})`;

const combineStyles = (
  ...modalStyles: (Modal.Styles | undefined)[]
): Modal.Styles => {
  const styles: Modal.Styles = {};
  modalStyles.forEach(s => {
    if (s?.content) styles.content = { ...styles.content, ...s.content };
    if (s?.overlay) styles.overlay = { ...styles.overlay, ...s.overlay };
  });
  return styles;
};

export const centerModalStyle: Modal.Styles = {
  content: {
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
    borderColor: 'black',
  },
  overlay: {
    backgroundColor: overlayTint,
  },
};

export interface CenteredModalProps extends ModalProps {
  centerText?: boolean;
}

const CenteredModal = ({
  centerText,
  style,
  children,
  ...props
}: CenteredModalProps) => (
  <Modal {...props} style={combineStyles(centerModalStyle, style)}>
    <CenteringStack gap="1rem" centerText={centerText}>
      {children}
    </CenteringStack>
  </Modal>
);

export default CenteredModal;
