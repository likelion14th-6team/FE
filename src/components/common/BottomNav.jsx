import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NAV_TABS } from '../../constants/navIcons';
import { NavIcon } from './NavIcons';

function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Nav aria-label="하단 메뉴">
      <Inner>
        {NAV_TABS.map((tab) => {
          const active = pathname === tab.path;
          return (
            <NavItem
              key={tab.path}
              type="button"
              $active={active}
              onClick={() => navigate(tab.path)}
              aria-current={active ? 'page' : undefined}
            >
              <NavIcon name={tab.iconKey} active={active} />
              <Label $active={active}>{tab.label}</Label>
            </NavItem>
          );
        })}
      </Inner>
    </Nav>
  );
}

export default BottomNav;

const Nav = styled.nav`
  position: fixed;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  width: min(calc(100vw - 52px), 341px);
  height: 56px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.nav};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 15;
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 50px;
  margin: 3px 6px;
`;

const NavItem = styled.button`
  width: 76px;
  height: 46px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 4px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.nav.fill : 'transparent'};
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 5px rgba(107, 191, 170, 0.7)'
      : '0 0 2.5px rgba(107, 191, 170, 0.35)'};
  transition: background 0.15s, box-shadow 0.15s;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.nav.fill : 'rgba(107, 191, 170, 0.08)'};
  }
`;

const Label = styled.span`
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.text.gray};
`;
