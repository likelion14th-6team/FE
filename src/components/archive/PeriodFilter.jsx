import { useEffect, useState } from 'react';
import styled from 'styled-components';

import FilterChip from './FilterChip';
import Modal from '../common/Modal';

/**
 * 기간 필터. 전체 / 연 / 월 / 일 모드.
 *
 * value = { mode, year?, month?, day? }
 *  - mode = 'all'           → 모든 기간
 *  - mode = 'year'  + year  → 그 해 전체
 *  - mode = 'month' + year/month → 그 달 전체
 *  - mode = 'day'   + year/month/day → 특정 날짜
 *
 * UI:
 *   [←] [라벨 ▾] [→]
 *   라벨 클릭 → 모달 (월 그리드 → 월 클릭 → 일자 그리드)
 *   ← → → 현재 모드에 따라 ±1 이동
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
        : value.mode === 'month'
          ? `${value.month}월`
          : `${value.month}월 ${value.day}일`;

  // 현재 모드 기준 ±1 이동
  const shiftPrev = () => onChange(shiftPeriod(value, -1));
  const shiftNext = () => onChange(shiftPeriod(value, +1));

  return (
    <>
      <Wrap>
        {showArrows && (
          <ArrowBtn type="button" onClick={shiftPrev} aria-label="이전">
            ←
          </ArrowBtn>
        )}

        <FilterChip
          label={labelText}
          active={isActive}
          onClick={() => setOpen(true)}
        />

        {showArrows && (
          <ArrowBtn type="button" onClick={shiftNext} aria-label="다음">
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

/* ===== 모드별 ±1 이동 ===== */

function shiftPeriod(value, delta) {
  if (value.mode === 'year') {
    return { ...value, year: value.year + delta };
  }
  if (value.mode === 'month') {
    let m = value.month + delta;
    let y = value.year;
    while (m > 12) { m -= 12; y += 1; }
    while (m < 1) { m += 12; y -= 1; }
    return { ...value, year: y, month: m };
  }
  if (value.mode === 'day') {
    const d = new Date(value.year, value.month - 1, value.day);
    d.setDate(d.getDate() + delta);
    return {
      mode: 'day',
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    };
  }
  return value;
}

/* ===== 모달 (월 그리드 ↔ 일자 그리드 view 전환) ===== */

function PeriodModal({ open, onClose, value, onChange }) {
  // view: 'month' = 월 그리드, 'day' = 일자 그리드
  const [view, setView] = useState('month');
  // 모달이 탐색 중인 연/월 (실제 적용은 onChange 시점)
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(5);

  // 모달이 열릴 때마다 초기화
  useEffect(() => {
    if (!open) return;
    const now = new Date();
    setView('month');
    setViewYear(value.year ?? now.getFullYear());
    setViewMonth(value.month ?? now.getMonth() + 1);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal open={open} onClose={onClose} variant="center" ariaLabel="기간 선택">
      {view === 'month' ? (
        <MonthView
          value={value}
          viewYear={viewYear}
          onChangeYear={setViewYear}
          onPickAll={() => onChange({ mode: 'all' })}
          onPickYear={() => onChange({ mode: 'year', year: viewYear })}
          onPickMonth={(m) => {
            setViewMonth(m);
            setView('day');
          }}
        />
      ) : (
        <DayView
          value={value}
          viewYear={viewYear}
          viewMonth={viewMonth}
          onShiftMonth={(delta) => {
            let m = viewMonth + delta;
            let y = viewYear;
            while (m > 12) { m -= 12; y += 1; }
            while (m < 1) { m += 12; y -= 1; }
            setViewYear(y);
            setViewMonth(m);
          }}
          onBack={() => setView('month')}
          onPickMonthAll={() =>
            onChange({ mode: 'month', year: viewYear, month: viewMonth })
          }
          onPickDay={(d) =>
            onChange({ mode: 'day', year: viewYear, month: viewMonth, day: d })
          }
        />
      )}
    </Modal>
  );
}

/* ===== 월 그리드 view ===== */

function MonthView({ value, viewYear, onChangeYear, onPickAll, onPickYear, onPickMonth }) {
  const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

  const isMonthSelected = (m) =>
    value.mode === 'month' && value.year === viewYear && value.month === m;

  return (
    <>
      <Header>
        <YearArrow type="button" onClick={() => onChangeYear(viewYear - 1)} aria-label="이전 연도">
          ←
        </YearArrow>
        <YearLabel>{viewYear}년</YearLabel>
        <YearArrow type="button" onClick={() => onChangeYear(viewYear + 1)} aria-label="다음 연도">
          →
        </YearArrow>
      </Header>

      <Section>
        <BigOption type="button" $selected={value.mode === 'all'} onClick={onPickAll}>
          전체
        </BigOption>
        <BigOption
          type="button"
          $selected={value.mode === 'year' && value.year === viewYear}
          onClick={onPickYear}
        >
          {viewYear}년 전체
        </BigOption>
      </Section>

      <Divider />

      <Grid>
        {MONTHS.map((m) => (
          <Cell
            key={m}
            type="button"
            $selected={isMonthSelected(m)}
            onClick={() => onPickMonth(m)}
          >
            {m}월
          </Cell>
        ))}
      </Grid>
    </>
  );
}

/* ===== 일자 그리드 view ===== */

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function DayView({
  value,
  viewYear,
  viewMonth,
  onShiftMonth,
  onBack,
  onPickMonthAll,
  onPickDay,
}) {
  // 해당 월의 1일이 무슨 요일인지, 며칠까지 있는지
  const firstDay = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0=일
  const lastDate = new Date(viewYear, viewMonth, 0).getDate(); // viewMonth의 말일

  // 그리드 채울 데이터: 앞쪽 빈칸 + 1~말일
  const cells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  const isDaySelected = (d) =>
    value.mode === 'day' &&
    value.year === viewYear &&
    value.month === viewMonth &&
    value.day === d;

  const isMonthAllSelected =
    value.mode === 'month' && value.year === viewYear && value.month === viewMonth;

  return (
    <>
      <Header>
        <BackBtn type="button" onClick={onBack} aria-label="뒤로">
          ←
        </BackBtn>
        <DayHeaderCenter>
          <YearArrow type="button" onClick={() => onShiftMonth(-1)} aria-label="이전 달">
            ←
          </YearArrow>
          <YearLabel>{viewYear}년 {viewMonth}월</YearLabel>
          <YearArrow type="button" onClick={() => onShiftMonth(+1)} aria-label="다음 달">
            →
          </YearArrow>
        </DayHeaderCenter>
        <BackBtnSpacer />
      </Header>

      <BigOption
        type="button"
        $selected={isMonthAllSelected}
        onClick={onPickMonthAll}
        style={{ width: '100%' }}
      >
        {viewMonth}월 전체
      </BigOption>

      <Divider />

      <DayGrid>
        {WEEKDAYS.map((w, i) => (
          <WeekHead key={w} $weekend={i === 0 || i === 6}>{w}</WeekHead>
        ))}
        {cells.map((d, i) =>
          d === null ? (
            <DayCell key={`empty-${i}`} as="div" $empty />
          ) : (
            <DayCell
              key={d}
              type="button"
              $selected={isDaySelected(d)}
              onClick={() => onPickDay(d)}
            >
              {d}
            </DayCell>
          ),
        )}
      </DayGrid>
    </>
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

/* 모달 내부 공통 */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  gap: 8px;
`;

const DayHeaderCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
`;

const BackBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.circle};
  border: none;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const BackBtnSpacer = styled.div`
  width: 32px;
  flex-shrink: 0;
`;

const YearArrow = styled.button`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radius.circle};
  border: none;
  background: ${({ theme }) => theme.colors.mint.light};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
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
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
  min-width: 110px;
  text-align: center;
`;

const Section = styled.div`
  display: flex;
  gap: 8px;
`;

const BigOption = styled.button`
  flex: 1;
  height: 56px;
  border: none;
  border-radius: 14px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  cursor: pointer;
  padding: 0 16px;

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

/* 월 그리드 */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Cell = styled.button`
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

/* 일자 그리드 */

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const WeekHead = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  padding: 6px 0;
  color: ${({ theme, $weekend }) =>
    $weekend ? theme.colors.danger : theme.colors.text.secondary};
`;

const DayCell = styled.button`
  aspect-ratio: 1;
  border: none;
  border-radius: ${({ theme }) => theme.radius.circle};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  cursor: ${({ $empty }) => ($empty ? 'default' : 'pointer')};
  visibility: ${({ $empty }) => ($empty ? 'hidden' : 'visible')};

  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.brand : 'transparent'};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.white : theme.colors.text.ink};

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.text.brand : theme.colors.mint.light};
  }
`;
