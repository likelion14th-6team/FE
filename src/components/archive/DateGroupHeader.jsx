import styled from 'styled-components';
import { formatShortDate } from '../../utils/dateUtils';

/**
 * 날짜 그룹 헤더. "오늘 5월 6일" 같은 형식.
 *
 * <DateGroupHeader label="오늘" date="2026-05-06" />
 *
 * 그룹 내 날짜가 여러 개일 수 있는 라벨(이번 주/지난 주/이번 달)에서는
 * 대표 날짜를 안 보여주고 라벨만 보여주고 싶을 수 있음 → showDate=false
 */
function DateGroupHeader({ label, date, showDate = true }) {
  return (
    <Header>
      <Label>{label}</Label>
      {showDate && date && <DateText>{formatShortDate(date)}</DateText>}
    </Header>
  );
}

export default DateGroupHeader;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 0;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const DateText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 300;
`;
