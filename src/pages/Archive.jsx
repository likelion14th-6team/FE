import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import MobileLayout from '../components/common/MobileLayout';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';

import TabSwitch from '../components/archive/TabSwitch';
import FilterChip from '../components/archive/FilterChip';
import FilterDropdown from '../components/archive/FilterDropdown';
import DateGroupHeader from '../components/archive/DateGroupHeader';
import ExpenseCard from '../components/archive/ExpenseCard';
import RegretSummaryCard from '../components/archive/RegretSummaryCard';
import EmptyState from '../components/archive/EmptyState';
import ExpenseDetailModal from '../components/archive/ExpenseDetailModal';

import { groupByDateLabel } from '../utils/dateUtils';
import { REGRET_THRESHOLD, CATEGORY_LIST } from '../utils/constants';
import { MOCK_EXPENSES } from '../data/mockExpenses';

const SAMPLE_EXPENSES = MOCK_EXPENSES;

// 카테고리 옵션 — 전체 + CATEGORIES 전부
const CATEGORY_OPTIONS = [
  { value: 'all', label: '전체' },
  ...CATEGORY_LIST.map((c) => ({ value: c.key, label: c.label })),
];

// 정렬 옵션
const SORT_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'amount-desc', label: '금액순' },
  { value: 'time-of-day', label: '시간대순' },
  { value: 'satisfaction-desc', label: '만족도순' },
];

// 정렬 함수 — sortOrder에 따라 비교 함수 반환
function getSortFn(sortOrder) {
  switch (sortOrder) {
    case 'amount-desc':
      return (a, b) => b.amount - a.amount;
    case 'time-of-day':
      // 시간(시:분)만 비교 — 아침→밤 순
      return (a, b) => {
        const ah = new Date(a.date).getHours() * 60 + new Date(a.date).getMinutes();
        const bh = new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes();
        return ah - bh;
      };
    case 'satisfaction-desc':
      return (a, b) => (b.satisfaction ?? 0) - (a.satisfaction ?? 0);
    case 'recent':
    default:
      return (a, b) => new Date(b.date) - new Date(a.date);
  }
}

function Archive() {
  const [tab, setTab] = useState('all'); // 'all' | 'regret'
  const [selectedExpense, setSelectedExpense] = useState(null);

  // 필터/정렬 상태
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recent');

  // 후회 탭 진입 시 정렬 기본을 '금액순'으로
  useEffect(() => {
    setSortOrder(tab === 'regret' ? 'amount-desc' : 'recent');
  }, [tab]);

  // 1차: 탭에 따라 베이스 데이터 결정 (전체 vs 후회만)
  const baseList = useMemo(() => {
    return tab === 'regret'
      ? SAMPLE_EXPENSES.filter((e) => e.satisfaction <= REGRET_THRESHOLD)
      : SAMPLE_EXPENSES;
  }, [tab]);

  // 2차: 카테고리 필터 적용
  const filteredList = useMemo(() => {
    if (categoryFilter === 'all') return baseList;
    return baseList.filter((e) => e.categoryKey === categoryFilter);
  }, [baseList, categoryFilter]);

  // 3차: 정렬 적용
  const sortedList = useMemo(() => {
    return [...filteredList].sort(getSortFn(sortOrder));
  }, [filteredList, sortOrder]);

  // 후회 통계 (요약 카드용) — 카테고리 필터까지는 반영, 정렬은 무관
  const regretStats = useMemo(() => {
    if (tab !== 'regret') return null;
    const list = filteredList;
    if (list.length === 0) return null;
    const totalAmount = list.reduce((sum, e) => sum + e.amount, 0);
    const avgSatisfaction =
      list.reduce((sum, e) => sum + e.satisfaction, 0) / list.length;
    return { totalAmount, count: list.length, avgSatisfaction };
  }, [tab, filteredList]);

  // 전체 탭은 자연어 날짜 그룹핑 (정렬은 그룹 내부에서 유지)
  // 단 '최신순'이 아닌 경우엔 그룹핑 의미가 떨어지므로 그룹핑 없이 평면 리스트
  const useGrouping = tab === 'all' && sortOrder === 'recent';
  const grouped = useMemo(() => {
    if (!useGrouping) return null;
    return groupByDateLabel(sortedList);
  }, [useGrouping, sortedList]);

  const handleCardClick = (expense) => {
    setSelectedExpense(expense);
  };

  const isEmpty = sortedList.length === 0;

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
          {/* 기간 필터 — Step 2에서 캘린더 UI 도입 예정 */}
          <FilterChip label="2026.05" />

          <FilterDropdown
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={CATEGORY_OPTIONS}
            active={categoryFilter !== 'all'}
            defaultLabel="전체"
          />

          <FilterDropdown
            value={sortOrder}
            onChange={setSortOrder}
            options={SORT_OPTIONS}
            active
            defaultLabel="최신순"
          />
        </FilterRow>

        {isEmpty ? (
          tab === 'all' ? (
            <EmptyState
              expression="sleeping"
              title="아직 기록된 소비가 없어요"
              description="조건을 바꿔보거나 첫 소비를 등록해보세요"
            />
          ) : (
            <EmptyState
              expression="excited"
              title="후회 소비가 없네요!"
              description="계속 이렇게만 가요"
            />
          )
        ) : useGrouping && grouped ? (
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
        ) : (
          <CardList>
            {sortedList.map((it) => (
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
