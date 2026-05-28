import styled from "styled-components";
import { ChevronDown } from "lucide-react";

/**
 * 드롭다운 칩. "2026.05 ▾" / "전체 ▾" / "최신순 ▾" 등.
 * 클릭 시 onClick 실행 — 드롭다운 메뉴는 부모가 띄움 (지금은 동작 안 함).
 *
 * <FilterChip label="2026.05" onClick={...} />
 * <FilterChip label="최신순" active onClick={...} />
 *
 * props:
 *  - label:    표시 텍스트
 *  - active:   true면 노란 배경 (강조). 기본 false
 *  - hasArrow: 화살표 ▾ 표시. 기본 true
 *  - onClick
 */
function FilterChip({ label, active = false, hasArrow = true, onClick }) {
  return (
    <Chip $active={active} onClick={onClick} type="button">
      <span>{label}</span>
      {hasArrow && <ArrowIcon size={14} strokeWidth={2.5} />}
    </Chip>
  );
}

export default FilterChip;

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 35px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  background: ${({ theme, $active }) =>
    $active ? "rgba(255, 240, 102, 0.8)" : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accent.yellowDark : theme.colors.text.ink};
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  transition: background 0.15s;

  &:hover {
    opacity: 0.9;
  }
`;

const ArrowIcon = styled(ChevronDown)`
  flex-shrink: 0;
`;
