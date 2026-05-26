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
import { MOCK_EXPENSES } from '../data/mockExpenses';

const SAMPLE_EXPENSES = MOCK_EXPENSES;

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
            { value: 'regret', label: '후회 소비', activeColor: '#FF6E6E' },
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
