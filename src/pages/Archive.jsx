import styled from 'styled-components';
import MobileLayout from '../components/common/MobileLayout';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';

const SAMPLE_RECORDS = [
  { id: 1, date: '2026-05-22', category: '식비', title: '점심 - 김치찌개', amount: 9000, emoji: '🍚' },
  { id: 2, date: '2026-05-22', category: '교통', title: '지하철', amount: 1500, emoji: '🚇' },
  { id: 3, date: '2026-05-21', category: '카페', title: '아메리카노', amount: 4500, emoji: '☕' },
  { id: 4, date: '2026-05-21', category: '문화', title: '영화관람', amount: 14000, emoji: '🎬' },
  { id: 5, date: '2026-05-20', category: '쇼핑', title: '서적 구입', amount: 22000, emoji: '📚' },
];

function Archive() {
  const grouped = SAMPLE_RECORDS.reduce((acc, r) => {
    acc[r.date] = acc[r.date] || [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <MobileLayout>
      <Header
        title="아카이브"
        subtitle="지난 소비를 돌아보세요"
        showBack
      />

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

      <BottomNav />
    </MobileLayout>
  );
}

export default Archive;

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
