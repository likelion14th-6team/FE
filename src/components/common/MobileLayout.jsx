import styled from 'styled-components';

/**
 * 모든 페이지의 최상위 래퍼.
 * - 데스크탑에서도 모바일 폭(480px)으로 제한 + 중앙 정렬
 * - 좌우 패딩 26px
 * - 그라데이션은 GlobalStyle이 body에 이미 입혀놨으므로 여기선 투명
 * - 하단 네비가 있는 페이지는 $hasBottomNav={true}로 하단 패딩 확보 (default true)
 *
 * 사용 예:
 *   <MobileLayout>                       // 하단 네비 있는 페이지
 *   <MobileLayout $hasBottomNav={false}> // 로그인/회원가입처럼 네비 없는 페이지
 */
function MobileLayout({ children, $hasBottomNav = true }) {
  return <Container $hasBottomNav={$hasBottomNav}>{children}</Container>;
}

export default MobileLayout;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.mobileMaxWidth};
  margin: 0 auto;
  padding: 0 clamp(16px, 5vw, ${({ theme }) => theme.layout.pagePaddingX});
  padding-bottom: ${({ theme, $hasBottomNav }) =>
    $hasBottomNav ? theme.layout.bottomNavHeight : '0'};
  background: transparent;
`;
