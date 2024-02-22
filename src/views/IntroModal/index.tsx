import { Button, ButtonTray } from '../../ui/Button';
import CenteredModal, { ModalTitle } from '../../ui/CenteredModal';
import { Info } from '../../ui/Info';

type IntroModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  openAbout: () => void;
  openHowTo: () => void;
};

const IntroModal = ({
  isOpen,
  closeModal,
  openAbout,
  openHowTo,
}: IntroModalProps): JSX.Element => (
  <CenteredModal isOpen={isOpen}>
    <ModalTitle>Timeline Journal</ModalTitle>
    <Info>
      Welcome! My name is Matt, and this page is a personal project of mine that
      I created to track events in my life, as well as meaningful dates,
      anniversaries, and big life changes. All data on this site is saved and
      loaded directly from your computer, so you can use this page to create a
      (private) timeline of your own. To get started, feel free to play around
      with the page, or see the about/help pages for more info. All work is my
      own, and not for resale or distribution. Thanks for stopping by!
    </Info>
    <ButtonTray right>
      <Button onClick={openAbout}>About</Button>
      <Button onClick={openHowTo}>Help</Button>
      <Button onClick={closeModal}>Close</Button>
    </ButtonTray>
  </CenteredModal>
);

export default IntroModal;
