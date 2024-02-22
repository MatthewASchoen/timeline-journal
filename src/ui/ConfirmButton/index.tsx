import { useState } from 'react';
import { Button, ButtonProps, ButtonTray } from '../Button';
import CenteredModal, { ModalSubtitle } from '../../ui/CenteredModal';

export type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  yesText?: string;
  noText?: string;
  disableModal?: boolean;
  stackButtons?: boolean;
  clickOutNo?: boolean;
};

/** Returns an onClick function paired with a modal that it launches */
export const useConfirmModal = ({
  message,
  onConfirm,
  yesText = 'Yes',
  noText = 'No',
  disableModal,
  stackButtons,
  clickOutNo,
}: ConfirmModalProps): [() => void, JSX.Element] => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const onClick = () => {
    if (disableModal) onConfirm();
    else setConfirmOpen(true);
  };

  const onYes = () => {
    setConfirmOpen(false);
    onConfirm();
  };
  const onNo = () => setConfirmOpen(false);

  const modal = (
    <CenteredModal
      isOpen={confirmOpen}
      onRequestClose={clickOutNo ? onNo : undefined}
    >
      <ModalSubtitle>{message}</ModalSubtitle>
      <ButtonTray right stack={stackButtons}>
        <Button onClick={onYes}>{yesText}</Button>
        <Button onClick={onNo}>{noText}</Button>
      </ButtonTray>
    </CenteredModal>
  );
  return [onClick, modal];
};

type ConfirmButtonProps = ConfirmModalProps & ButtonProps;

const ConfirmButton = (props: ConfirmButtonProps): JSX.Element => {
  const [onClick, modal] = useConfirmModal(props);
  return (
    <>
      <Button {...props} onClick={onClick} />
      {modal}
    </>
  );
};

export default ConfirmButton;
