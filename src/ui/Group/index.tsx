import { HTMLAttributes, ReactNode } from 'react';
import * as S from './styled';
import styled from 'styled-components';
import { onKeys } from '../keys';
import { ClickySpan } from '../ClickySpan';
import { DownArrow } from '../LRSelect/Arrows';

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  buttons?: JSX.Element;
  collapsed?: boolean;
  onCollapse?: () => void;
}

const Group = ({
  label,
  buttons,
  onCollapse,
  children,
  ...divProps
}: React.PropsWithChildren<GroupProps>): JSX.Element => (
  <S.GroupBox {...divProps} hasTopContent={!!(label || buttons)}>
    {label && (
      <S.GroupLabel>
        {onCollapse ? (
          <S.LabelWithCollapse>
            <ClickySpan onClick={onCollapse} linkLike>
              {label}
            </ClickySpan>
            <DownArrow
              onClick={onCollapse}
              onKeyDown={onKeys({ confirm: onCollapse })}
              flip={!divProps.collapsed}
            />
          </S.LabelWithCollapse>
        ) : (
          label
        )}
      </S.GroupLabel>
    )}
    {buttons && <S.TopRightButtons>{buttons}</S.TopRightButtons>}
    <S.GroupInner>{children}</S.GroupInner>
  </S.GroupBox>
);

export default Group;

export const GroupWithButtons = styled(Group)`
  padding-bottom: 0.5rem;
  > ${S.GroupInner} {
    display: grid;
    grid-template-rows: auto min-content;
  }
`;

export type TabWithId = { id: string; name: string; content: ReactNode };

export interface TabGroupProps extends HTMLAttributes<HTMLDivElement> {
  tabs: TabWithId[];
  tab: string;
  setTab: (tab: string) => void;
}

export const TabGroup = ({
  tabs,
  tab,
  setTab,
  ...divProps
}: TabGroupProps): JSX.Element => (
  <S.TabGroupContainer>
    <S.TabTray>
      {tabs.map(({ id, name }) => (
        <S.Tab key={`tab-${id}`} active={id === tab} onClick={() => setTab(id)}>
          {name}
        </S.Tab>
      ))}
    </S.TabTray>
    <S.TabGroupBox {...divProps}>
      <S.GroupInner>{tabs.find(({ id }) => id === tab)?.content}</S.GroupInner>
    </S.TabGroupBox>
  </S.TabGroupContainer>
);
