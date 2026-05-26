import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FilterChip from './FilterChip';

/**
 * 기간 필터. 전체 / 연 / 월 모드.
 *
 * value = { mode: 'all' | 'year' | 'month', year?, month? }
 *
 * <PeriodFilter value={period} onChange={setPeriod} />
 *
 * UI: [←] [라벨 ▾] [→]
 *   - 라벨 클릭 → 모드 전환 메뉴 (전체/연/월)
 *   - 좌우 화살표 → 월/연 이동 (전체 모드일 땐 화살표 숨김)
 */
function PeriodFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const showArrows = value.mode !== 'all';
  const isActive = value.mode !== 'all';

  // 라벨 텍스트
  const labelText =
    value.mode === 'all'
      ? '전체'
      : value.mode === 'year'
        ? `${value.year}년`
        : `${value.year}.${String(value.month).padStart(2, '0')}`;

  // 외부 클릭/ESC 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

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

  const handleModeChange = (nextMode) => {
    const now = new Date();
    if (nextMode === 'all') {
      onChange({ mode: 'all' });
    } else if (nextMode === 'year') {
      onChange({
        mode: 'year',
        year: value.year ?? now.getFullYear(),
      });
    } else {
      onChange({
        mode: 'month',
        year: value.year ?? now.getFullYear(),
        month: value.month ?? now.getMonth() + 1,
      });
    }
    setOpen(false);
  };

  const modes = [
    { value: 'all', label: '전체' },
    { value: 'year', label: '연도' },
    { value: 'month', label: '월별' },
  ];

  return (
    <Wrap ref={wrapRef}>
      {showArrows && (
        <ArrowBtn type="button" onClick={handlePrev} aria-label="이전">
          ←
        </ArrowBtn>
      )}

      <ChipBox>
        <FilterChip
          label={labelText}
          active={isActive}
          onClick={() => setOpen((o) => !o)}
        />
        {open && (
          <Menu role="listbox">
            {modes.map((m) => (
              <MenuItem
                key={m.value}
                role="option"
                aria-selected={m.value === value.mode}
                $selected={m.value === value.mode}
                onClick={() => handleModeChange(m.value)}
                type="button"
              >
                {m.label}
                {m.value === value.mode && <Check>✓</Check>}
              </MenuItem>
            ))}
          </Menu>
        )}
      </ChipBox>

      {showArrows && (
        <ArrowBtn type="button" onClick={handleNext} aria-label="다음">
          →
        </ArrowBtn>
      )}
    </Wrap>
  );
}

export default PeriodFilter;

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ChipBox = styled.div`
  position: relative;
`;

const ArrowBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.circle};
  border: none;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  /* GeekbleMalang은 화살표 글리프가 없거나 작아서 시스템 폰트 명시 */
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

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 50;
  min-width: 120px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  padding: 4px;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border: none;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.mint.light : 'transparent'};
  border-radius: 8px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.brand : theme.colors.text.ink};
  cursor: pointer;
  text-align: left;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.mint.light : 'rgba(0,0,0,0.04)'};
  }
`;

const Check = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.brand};
`;
