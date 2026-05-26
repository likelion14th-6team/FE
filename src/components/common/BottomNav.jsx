import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 하단 고정 탭바. 5개 탭.
 * - 현재 경로(useLocation)와 일치하는 탭을 자동으로 활성 표시.
 * - 사용: <BottomNav />  (props 없음)
 *
 * 페이지에서 이 컴포넌트가 가리는 공간은 MobileLayout의 $hasBottomNav가 처리.
 */

const TABS = [
  { path: '/', label: '홈' },
  { path: '/report', label: '리포트' },
  { path: '/register', label: '등록' },
  { path: '/archive', label: '아카이브' },
  { path: '/mypage', label: '마이' },
];

function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Nav>
      {TABS.map((tab) => (
        <NavButton
          key={tab.path}
          $active={pathname === tab.path}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </NavButton>
      ))}
    </Nav>
  );
}

export default BottomNav;

const Nav = styled.nav`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100vw - 52px);
  max-width: calc(${({ theme }) => theme.layout.mobileMaxWidth} - 52px);
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 4px;
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: 6px 4px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.ink : 'rgba(15, 19, 28, 0.55)'};
  cursor: pointer;
  transition: color 0.15s, font-weight 0.15s;
`;
