import { useState, useMemo } from 'react';
import styled from 'styled-components';

import MobileLayout from '../components/common/MobileLayout';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';

import TabSwitch from '../components/archive/TabSwitch';
import FilterChip from '../components/archive/FilterChip';
import DateGroupHeader from '../components/archive/DateGroupHeader';
import ExpenseCard from '../components/archive/ExpenseCard';
import RegretSummaryCard from '../components/archive/RegretSummaryCard';
import EmptyState from '../components/archive/EmptyState';
import ExpenseDetailModal from '../components/archive/ExpenseDetailModal';

import { groupByDateLabel } from '../utils/dateUtils';
import { REGRET_THRESHOLD } from '../utils/constants';

// 더미: 백엔드 연동 전까지 사용. 만족도 <= 2 가 후회 소비.
// 오늘 기준 (2026-05-25 월요일)
const SAMPLE_EXPENSES = [
  // 오늘
  { id: 1,  title: '스타벅스 아메리카노', categoryKey: 'cafe',      amount: 4500,  date: '2026-05-25T14:30', satisfaction: 4, memo: '오후 회의 전 카페인 충전. 가성비는 별로지만 자리가 좋았다.' },
  { id: 2,  title: '지하철',           categoryKey: 'transport', amount: 1500,  date: '2026-05-25T09:15', satisfaction: 5, memo: null },
  { id: 3,  title: '편의점 도시락',     categoryKey: 'food',      amount: 5500,  date: '2026-05-25T12:00', satisfaction: 3, memo: '시간 없어서 대충 때움.' },
  // 어제
  { id: 4,  title: '후드티',           categoryKey: 'shopping',  amount: 58000, date: '2026-05-24T23:42', satisfaction: 2, memo: '밤에 충동적으로 결제. 이미 비슷한 거 두 벌 있는데...' },
  { id: 5,  title: '점심 김치찌개',     categoryKey: 'food',      amount: 9000,  date: '2026-05-24T12:30', satisfaction: 5, memo: '회사 근처 새로 생긴 곳. 동료들이랑 또 가야지!' },
  // 지난 주
  { id: 6,  title: '영화 관람',        categoryKey: 'culture',   amount: 15000, date: '2026-05-22T14:30', satisfaction: 4, memo: null },
  { id: 7,  title: '택시 (귀가)',      categoryKey: 'transport', amount: 23000, date: '2026-05-22T04:00', satisfaction: 1, memo: '술 마시고 막차 놓침. 다음엔 일찍 일어나기.' },
  { id: 8,  title: '야식 치킨',        categoryKey: 'food',      amount: 22000, date: '2026-05-21T23:30', satisfaction: 2, memo: '배 안 고팠는데 분위기에 휩쓸려서 시킴.' },
  // 이번 달 (그 이전)
  { id: 9,  title: '야식 치킨',        categoryKey: 'food',      amount: 24000, date: '2026-05-15T22:30', satisfaction: 1, memo: '또 야식 치킨... 후회 중.' },
  { id: 10, title: '서적 구입',        categoryKey: 'shopping',  amount: 22000, date: '2026-05-10T15:00', satisfaction: 5, memo: null },
  { id: 11, title: '카페 디저트',      categoryKey: 'cafe',      amount: 12000, date: '2026-05-05T16:00', satisfaction: 2, memo: '맛도 별로고 비쌌음.' },
  { id: 12, title: '운동복',          categoryKey: 'clothing',  amount: 45000, date: '2026-05-03T11:00', satisfaction: 4, memo: null },
];

function Archive() {
  const [tab, setTab] = useState('all'); // 'all' | 'regret'
  const [selectedExpense, setSelectedExpense] = useState(null);

  // 후회 소비만 추려둠
  const regretItems = useMemo(
    () => SAMPLE_EXPENSES.filter((e) => e.satisfaction <= REGRET_THRESHOLD),
    [],
  );

  // 후회 통계 (없으면 null)
  const regretStats = useMemo(() => {
    if (regretItems.length === 0) return null;
    const totalAmount = regretItems.reduce((sum, e) => sum + e.amount, 0);
    const avgSatisfaction =
      regretItems.reduce((sum, e) => sum + e.satisfaction, 0) /
      regretItems.length;
    return {
      totalAmount,
      count: regretItems.length,
      avgSatisfaction,
    };
  }, [regretItems]);

  // 전체 탭: 자연어 날짜 그룹
  const grouped = useMemo(() => groupByDateLabel(SAMPLE_EXPENSES), []);

  // 후회 탭: 금액 높은 순으로 평면 정렬
  const sortedRegret = useMemo(
    () => [...regretItems].sort((a, b) => b.amount - a.amount),
    [regretItems],
  );

  const handleCardClick = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <MobileLayout>
      <Header
        title="아카이브"
        rightSlot={
          <SearchButton type="button" aria-label="검색">
            🔍
          </SearchButton>
        }
      />

      <Body>
        <TabSwitch
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'all', label: '전체' },
            { value: 'regret', label: '후회 소비', activeColor: '#FF8B8B' },
          ]}
        />

        {tab === 'regret' && regretStats && (
          <RegretSummaryCard {...regretStats} />
        )}

        <FilterRow>
          <FilterChip label="2026.05" />
          <FilterChip label="전체" />
          <FilterChip
            label={tab === 'regret' ? '금액 높은 순' : '최신순'}
            active
          />
        </FilterRow>

        {tab === 'all' ? (
          grouped.length === 0 ? (
            <EmptyState
              expression="sleeping"
              title="아직 기록된 소비가 없어요"
              description="첫 소비를 등록해보세요"
            />
          ) : (
            <Groups>
              {grouped.map(({ label, items }) => (
                <Group key={label}>
                  <DateGroupHeader label={label} date={items[0].date} />
                  <CardList>
                    {items.map((it) => (
                      <ExpenseCard
                        key={it.id}
                        expense={it}
                        onClick={() => handleCardClick(it)}
                      />
                    ))}
                  </CardList>
                </Group>
              ))}
            </Groups>
          )
        ) : sortedRegret.length === 0 ? (
          <EmptyState
            expression="excited"
            title="후회 소비가 없네요!"
            description="계속 이렇게만 가요"
          />
        ) : (
          <CardList>
            {sortedRegret.map((it) => (
              <ExpenseCard
                key={it.id}
                expense={it}
                onClick={() => handleCardClick(it)}
              />
            ))}
          </CardList>
        )}
      </Body>

      <BottomNav />

      <ExpenseDetailModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />
    </MobileLayout>
  );
}

export default Archive;

const SearchButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.circle};
  border: none;
  background: ${({ theme }) => theme.colors.whiteAlpha60};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.whiteAlpha85};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
