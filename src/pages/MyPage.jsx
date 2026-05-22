import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const USER = {
  name: '이지연',
  email: '2ziziy@hufs.ac.kr',
  joinDate: '2026-03-15',
  totalRecords: 142,
};

const MENU_ITEMS = [
  { label: '프로필 수정', icon: '👤' },
  { label: '알림 설정', icon: '🔔' },
  { label: '카테고리 관리', icon: '🏷️' },
  { label: '데이터 내보내기', icon: '📤' },
  { label: '도움말', icon: '❓' },
  { label: '약관 및 정책', icon: '📋' },
];

function MyPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
      </TopBar>
      <PageHeader>
        <h1>마이페이지</h1>
      </PageHeader>

      <ProfileCard>
        <Avatar>{USER.name[0]}</Avatar>
        <ProfileInfo>
          <ProfileName>{USER.name}</ProfileName>
          <ProfileEmail>{USER.email}</ProfileEmail>
        </ProfileInfo>
      </ProfileCard>

      <StatRow>
        <StatBox>
          <StatValue>{USER.totalRecords}</StatValue>
          <StatLabel>총 기록</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{USER.joinDate.slice(5)}</StatValue>
          <StatLabel>가입일</StatLabel>
        </StatBox>
      </StatRow>

      <MenuList>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.label}>
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuLabel>{item.label}</MenuLabel>
            <MenuArrow>›</MenuArrow>
          </MenuItem>
        ))}
      </MenuList>

      <LogoutBtn onClick={() => navigate('/login')}>로그아웃</LogoutBtn>

      <BottomNav>
        <NavButton onClick={() => navigate('/archive')}>아카이브</NavButton>
        <NavButton onClick={() => navigate('/register')}>등록</NavButton>
        <NavButton onClick={() => navigate('/report')}>리포트</NavButton>
        <NavButton $active onClick={() => navigate('/mypage')}>마이</NavButton>
      </BottomNav>
    </Page>
  );
}

export default MyPage;

const Page = styled.div`
  min-height: 100vh;
  padding: 0 16px;
  max-width: 393px;
  margin: 0 auto;
  padding-bottom: 88px;
`;

const PageHeader = styled.header`
  padding: 32px 0 16px;
  h1 { font-family: 'GeekbleMalang', sans-serif; font-weight: 800; font-size: 28px; color: #0f131c; }
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 33px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(393px - 52px);
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 4px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: 4px 8px;
  font-family: inherit;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#0f131c' : 'rgba(15,19,28,0.65)')};
  cursor: pointer;
  font-size: 10px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  color: #0f131c;
  &:hover { background: rgba(255, 255, 255, 0.85); }
`;

const TopBar = styled.div`
  padding-top: 16px;
  padding-bottom: 4px;
`;

const ProfileCard = styled.section`
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0f131c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileName = styled.h2`
  font-family: 'GeekbleMalang', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #0f131c;
`;

const ProfileEmail = styled.p`
  color: #aaa;
  font-weight: 300;
  font-size: 13px;
`;

const StatRow = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px 0;
`;

const StatBox = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const StatValue = styled.span`
  font-weight: 800;
  font-size: 20px;
  color: #0f131c;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: #bbb;
  font-weight: 300;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.1s;
  &:last-child { border-bottom: none; }
  &:hover { background: #f8faf9; }
`;

const MenuIcon = styled.span`
  font-size: 18px;
  width: 24px;
`;

const MenuLabel = styled.span`
  flex: 1;
  color: #0f131c;
  font-weight: 500;
`;

const MenuArrow = styled.span`
  color: #ddd;
  font-size: 20px;
`;

const LogoutBtn = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 14px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  color: #e05555;
  font-weight: 500;
  font-family: inherit;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  &:hover { background: #fff5f5; }
`;
