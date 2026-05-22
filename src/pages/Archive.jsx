import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SAMPLE_RECORDS = [
  { id: 1, date: '2026-05-22', category: '식비', title: '점심 - 김치찌개', amount: 9000, emoji: '🍚' },
  { id: 2, date: '2026-05-22', category: '교통', title: '지하철', amount: 1500, emoji: '🚇' },
  { id: 3, date: '2026-05-21', category: '카페', title: '아메리카노', amount: 4500, emoji: '☕' },
  { id: 4, date: '2026-05-21', category: '문화', title: '영화관람', amount: 14000, emoji: '🎬' },
  { id: 5, date: '2026-05-20', category: '쇼핑', title: '서적 구입', amount: 22000, emoji: '📚' },
];

function Archive() {
  const navigate = useNavigate();

  const grouped = SAMPLE_RECORDS.reduce((acc, r) => {
    acc[r.date] = acc[r.date] || [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <Page>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
      </TopBar>
      <PageHeader>
        <h1>아카이브</h1>
        <p>지난 소비를 돌아보세요</p>
      </PageHeader>

      <List>
        {Object.entries(grouped).map(([date, items]) => (
          <Section key={date}>
            <DateLabel>{date}</DateLabel>
            <RecordList>
              {items.map((item) => (
                <RecordItem key={item.id}>
                  <Emoji>{item.emoji}</Emoji>
                  <Info>
                    <Title>{item.title}</Title>
                    <Category>{item.category}</Category>
                  </Info>
                  <Amount>{item.amount.toLocaleString()}원</Amount>
                </RecordItem>
              ))}
            </RecordList>
          </Section>
        ))}
      </List>

      <BottomNav>
        <NavButton $active onClick={() => navigate('/archive')}>아카이브</NavButton>
        <NavButton onClick={() => navigate('/register')}>등록</NavButton>
        <NavButton onClick={() => navigate('/report')}>리포트</NavButton>
        <NavButton onClick={() => navigate('/mypage')}>마이</NavButton>
      </BottomNav>
    </Page>
  );
}

export default Archive;

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.section`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const DateLabel = styled.h2`
  font-size: 13px;
  color: #aaa;
  font-weight: 500;
  margin-bottom: 12px;
`;

const RecordList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RecordItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;

const Emoji = styled.span`
  font-size: 22px;
  width: 34px;
  text-align: center;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.span`
  font-weight: 500;
  color: #0f131c;
  font-size: 15px;
`;

const Category = styled.span`
  font-size: 12px;
  color: #bbb;
  font-weight: 300;
`;

const Amount = styled.span`
  font-weight: 700;
  color: #0f131c;
  font-size: 15px;
`;
