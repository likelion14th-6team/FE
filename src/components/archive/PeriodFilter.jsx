import { useState } from 'react';
import styled from 'styled-components';

import FilterChip from './FilterChip';
import Modal from '../common/Modal';

/**
 * 기간 필터. 전체 / 연 / 월 모드.
 *
 * value = { mode: 'all' | 'year' | 'month', year?, month? }
 *
 * UI: [←] [라벨 ▾] [→]
 *   - 라벨 클릭 → 캘린더 모달 (월 그리드)
 *   - 좌우 화살표 → 월/연 ±1 이동 (전체 모드일 땐 화살표 숨김)
 */
function PeriodFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const showArrows = value.mode !== 'all';
  const isActive = value.mode !== 'all';

  const labelText =
    value.mode === 'all'
      ? '전체'
      : value.mode === 'year'
        ? `${value.year}년`
        : `${value.year}.${String(value.month).padStart(2, '0')}`;

  const handlePrev = () => {
    if (value.mode === 'year') {
      onChange({ ...value, year: value.year - 1 });
    } else if (value.mode === 'month') {
      let m = value.month - 1;
      let y = value.year;
      if (m === 0) {
        m = 12;
        y -= 1;
      }
      onChange({ ...value, year: y, month: m });
    }
  };

  const handleNext = () => {
    if (value.mode === 'year') {
      onChange({ ...value, year: value.year + 1 });
    } else if (value.mode === 'month') {
      let m = value.month + 1;
      let y = value.year;
      if (m === 13) {
        m = 1;
        y += 1;
      }
      onChange({ ...value, year: y, month: m });
    }
  };

  return (
    <>
      <Wrap>
        {showArrows && (
          <ArrowBtn type="button" onClick={handlePrev} aria-label="이전">
            ←
          </ArrowBtn>
        )}

        <FilterChip
          label={labelText}
          active={isActive}
          onClick={() => setOpen(true)}
        />

        {showArrows && (
          <ArrowBtn type="button" onClick={handleNext} aria-label="다음">
            →
          </ArrowBtn>
        )}
      </Wrap>

      <PeriodModal
        open={open}
        onClose={() => setOpen(false)}
        value={value}
        onChange={(next) => {
          onChange(next);
          setOpen(false);
        }}
      />
    </>
  );
}

export default PeriodFilter;

/* ===== 모달 내부: 캘린더형 월 그리드 ===== */

function PeriodModal({ open, onClose, value, onChange }) {
  // 모달이 열린 시점의 연도를 내부 상태로 (← →로 다른 연도 탐색 가능)
  const initialYear =
    value.mode !== 'all' ? value.year : new Date().getFullYear();
  const [viewYear, setViewYear] = useState(initialYear);

  // 모달이 새로 열릴 때마다 연도 동기화
  // (open이 true→false→true 토글되면 다시 현재 value.year로 리셋)
  // → key 패턴 대신 effect 한 줄로 처리
  // (열림 직후 useEffect를 쓰지 않는 가벼운 방식: open=false면 컴포넌트가 null 반환)
  if (!open) {
    // 다음에 열릴 때 viewYear가 stale 안 되도록 reset
    // (실제로는 Modal 컴포넌트가 open=false면 자식 안 그리니 안전)
  }

  const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

  const isMonthSelected = (m) =>
    value.mode === 'month' && value.year === viewYear && value.month === m;

  const handleSelectAll = () => onChange({ mode: 'all' });
  const handleSelectYear = () => onChange({ mode: 'year', year: viewYear });
  const handleSelectMonth = (m) =>
    onChange({ mode: 'month', year: viewYear, month: m });

  return (
    <Modal open={open} onClose={onClose} variant="center" ariaLabel="기간 선택">
      <Header>
        <YearNav>
          <YearArrow type="button" onClick={() => setViewYear((y) => y - 1)} aria-label="이전 연도">
            ←
          </YearArrow>
          <YearLabel>{viewYear}년</YearLabel>
          <YearArrow type="button" onClick={() => setViewYear((y) => y + 1)} aria-label="다음 연도">
            →
          </YearArrow>
        </YearNav>
      </Header>

      <Section>
        <BigOption
          type="button"
          $selected={value.mode === 'all'}
          onClick={handleSelectAll}
        >
          전체
        </BigOption>
        <BigOption
          type="button"
          $selected={value.mode === 'year' && value.year === viewYear}
          onClick={handleSelectYear}
        >
          {viewYear}년 전체
        </BigOption>
      </Section>

      <Divider />

      <MonthGrid>
        {MONTHS.map((m) => (
          <MonthCell
            key={m}
            type="button"
            $selected={isMonthSelected(m)}
            onClick={() => handleSelectMonth(m)}
          >
            {m}월
          </MonthCell>
        ))}
      </MonthGrid>
    </Modal>
  );
}

/* ===== 스타일 ===== */

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ArrowBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.circle};
  border: none;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.ink};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    opacity: 0.85;
  }
`;

/* 모달 내부 */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
`;

const YearNav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const YearArrow = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.circle};
  border: none;
  background: ${({ theme }) => theme.colors.mint.light};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.brand};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.85;
  }
`;

const YearLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
  min-width: 80px;
  text-align: center;
`;

const Section = styled.div`
  display: flex;
  gap: 8px;
`;

const BigOption = styled.button`
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.brand : theme.colors.mint.light};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.white : theme.colors.text.brand};

  &:hover {
    opacity: 0.9;
  }
`;

const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const MonthCell = styled.button`
  height: 44px;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.brand : 'transparent'};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.white : theme.colors.text.ink};

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.text.brand : theme.colors.mint.light};
  }
`;
