import { TabGroup, TabGroupProps } from '../../ui/Group';
import { Button, ButtonTray } from '../../ui/Button';
import { helpTabs } from './tabs';
import * as S from './styled';
import { AppView } from '../TimelineApp/state-hooks';

interface HelpViewProps extends Omit<TabGroupProps, 'tabs'> {
  goBack: () => void;
  setView: (view: AppView) => void;
}

const HelpView = ({
  goBack,
  setView,
  ...tabGroupProps
}: HelpViewProps): JSX.Element => (
  <S.HelpViewContainer>
    <TabGroup
      tabs={helpTabs(tabGroupProps.setTab, setView)}
      {...tabGroupProps}
    />
    <ButtonTray right>
      <Button onClick={goBack}>Back to Timeline</Button>
    </ButtonTray>
  </S.HelpViewContainer>
);

export default HelpView;
