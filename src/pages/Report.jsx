import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CATEGORIES = [
  { name: '식비', amount: 142000, color: '#ff9b6c' },
  { name: '카페', amount: 56000, color: '#9b8c75' },
  { name: '교통', amount: 38000, color: '#7eaad8' },
  { name: '문화', amount: 56000, color: '#d8a8c8' },
  { name: '쇼핑', amount: 50000, color: '#a8d8b0' },
];

function Report() {
  const navigate = useNavigate();
  const monthTotal = 342000;
  const monthBudget = 500000;
  const ratio = Math.min(100, Math.round((monthTotal / monthBudget) * 100));
  const max = Math.max(...CATEGORIES.map((c) => c.amount));

  return (
    <Page>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
      </TopBar>
      <PageHeader>
        <h1>리포트</h1>
        <p>2026년 5월</p>
      </PageHeader>

      <SummaryCard>
        <SummaryTop>
          <SummaryLabel>이번 달 소비</SummaryLabel>
          <SummaryAmount>{monthTotal.toLocaleString()}원</SummaryAmount>
        </SummaryTop>
        <ProgressBar>
          <ProgressFill $ratio={ratio} />
        </ProgressBar>
        <SummaryBottom>
          <span>예산 {monthBudget.toLocaleString()}원</span>
          <span>{ratio}% 사용</span>
        </SummaryBottom>
      </SummaryCard>

      <ChartCard>
        <ChartTitle>카테고리별 소비</ChartTitle>
        <BarList>
          {CATEGORIES.map((c) => (
            <BarRow key={c.name}>
              <BarLabel>{c.name}</BarLabel>
              <BarTrack>
                <BarFill $width={(c.amount / max) * 100} $color={c.color} />
              </BarTrack>
              <BarAmount>{c.amount.toLocaleString()}원</BarAmount>
            </BarRow>
          ))}
        </BarList>
      </ChartCard>

      <InsightCard>
        <ChartTitle>인사이트</ChartTitle>
        <InsightText>
          이번 달은 <strong>식비</strong>에 가장 많이 소비했어요.
          지난 달 대비 <strong>12% 감소</strong>했습니다 👍
        </InsightText>
      </InsightCard>

      <BottomNav>
        <NavButton onClick={() => navigate('/archive')}>아카이브</NavButton>
        <NavButton onClick={() => navigate('/register')}>등록</NavButton>
        <NavButton $active onClick={() => navigate('/report')}>리포트</NavButton>
        <NavButton onClick={() => navigate('/mypage')}>마이</NavButton>
      </BottomNav>
    </Page>
  );
}

export default Report;

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
  p { color: rgba(15, 19, 28, 0.5); font-weight: 300; margin-top: 6px; }
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

const SummaryCard = styled.section`
  background: #0f131c;
  color: #fff;
  padding: 26px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const SummaryTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
`;

const SummaryLabel = styled.span`
  font-weight: 300;
  opacity: 0.8;
  font-size: 14px;
`;

const SummaryAmount = styled.span`
  font-family: 'GeekbleMalang', sans-serif;
  font-weight: 800;
  font-size: 28px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $ratio }) => $ratio}%;
  background: #ACDAC1;
  border-radius: 4px;
`;

const SummaryBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.7;
`;

const ChartCard = styled.section`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const InsightCard = styled(ChartCard)``;

const ChartTitle = styled.h2`
  font-family: 'GeekbleMalang', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #0f131c;
  margin-bottom: 16px;
`;

const BarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BarRow = styled.li`
  display: grid;
  grid-template-columns: 52px 1fr 88px;
  align-items: center;
  gap: 8px;
`;

const BarLabel = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: #444;
`;

const BarTrack = styled.div`
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  border-radius: 5px;
`;

const BarAmount = styled.span`
  text-align: right;
  font-weight: 700;
  font-size: 12px;
  color: #0f131c;
`;

const InsightText = styled.p`
  line-height: 1.7;
  color: #555;
  font-weight: 300;
  strong { font-weight: 700; color: #0f131c; }
`;
