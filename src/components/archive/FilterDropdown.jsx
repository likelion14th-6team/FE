import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import FilterChip from './FilterChip';

/**
 * 드롭다운 메뉴가 달린 필터 칩.
 * - 칩 클릭 → 메뉴 펼침
 * - 외부 클릭 / ESC → 닫힘
 * - 옵션 선택 → onChange(value) + 메뉴 닫힘
 *
 * <FilterDropdown
 *   value={categoryFilter}
 *   onChange={setCategoryFilter}
 *   options={[
 *     { value: 'all',       label: '전체' },
 *     { value: 'food',      label: '식비' },
 *     { value: 'transport', label: '교통' },
 *   ]}
 *   active            // 칩 노란 강조 여부 (선택)
 *   defaultLabel="전체"  // value가 옵션에 없을 때 fallback (선택)
 * />
 */
function FilterDropdown({ value, onChange, options, active, defaultLabel, label }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // 칩 표시용 라벨 — 외부 label prop이 있으면 그것을 우선,
  // 없으면 옵션에서 매칭되는 라벨, 둘 다 없으면 defaultLabel.
  const currentLabel =
    label ?? options.find((o) => o.value === value)?.label ?? defaultLabel ?? '';

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleSelect = (next) => {
    onChange?.(next);
    setOpen(false);
  };

  return (
    <Wrap ref={wrapRef}>
      <FilterChip
        label={currentLabel}
        active={active}
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <Menu role="listbox">
          {options.map((opt) => (
            <MenuItem
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              $selected={opt.value === value}
              onClick={() => handleSelect(opt.value)}
              type="button"
            >
              {opt.label}
              {opt.value === value && <CheckIcon size={14} strokeWidth={2.5} />}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrap>
  );
}

export default FilterDropdown;

const Wrap = styled.div`
  position: relative;
  display: inline-block;
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

const CheckIcon = styled(Check)`
  color: ${({ theme }) => theme.colors.text.brand};
  flex-shrink: 0;
`;
