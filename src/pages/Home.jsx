import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PAGES = [
  { path: '/login', label: '로그인', emoji: '🔑', desc: 'Login' },
  { path: '/signup', label: '회원가입', emoji: '📝', desc: 'Signup' },
  { path: '/archive', label: '아카이브', emoji: '📂', desc: 'Archive' },
  { path: '/register', label: '소비 등록', emoji: '💸', desc: 'Register' },
  { path: '/report', label: '리포트', emoji: '📊', desc: 'Report' },
  { path: '/mypage', label: '마이페이지', emoji: '👤', desc: 'MyPage' },
];

function Home() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo>slog</Logo>
      <Subtitle>페이지 네비게이션 (임시)</Subtitle>

      <Grid>
        {PAGES.map((p) => (
          <PageCard key={p.path} onClick={() => navigate(p.path)}>
            <Emoji>{p.emoji}</Emoji>
            <Name>{p.label}</Name>
            <Desc>{p.desc}</Desc>
          </PageCard>
        ))}
      </Grid>

      <Badge>배포 전 임시 화면</Badge>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 26px 40px;
  max-width: 393px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-family: 'GeekbleMalang', sans-serif;
  font-weight: 800;
  font-size: 52px;
  color: #0f131c;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: #aaa;
  margin-bottom: 36px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  width: 100%;
`;

const PageCard = styled.button`
  background: #fff;
  border: none;
  border-radius: 16px;
  padding: 26px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.15s, box-shadow 0.15s;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09);
  }
`;

const Emoji = styled.span`
  font-size: 28px;
  margin-bottom: 4px;
`;

const Name = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #0f131c;
  font-family: 'GeekbleMalang', sans-serif;
`;

const Desc = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: #aaa;
`;

const Badge = styled.div`
  margin-top: 36px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #888;
`;
