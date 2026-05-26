import styled from 'styled-components';
import { formatCurrency } from '../../utils/formatCurrency';
import Mochi from '../common/Mochi';

/**
 * 후회 소비 탭 최상단 요약 카드.
 *
 * <RegretSummaryCard
 *   monthLabel="이번 달"
 *   totalAmount={127500}
 *   count={5}
 *   avgSatisfaction={1.6}
 * />
 *
 * props:
 *  - monthLabel:     상단 안내 (기본 "이번 달")
 *  - totalAmount:    후회 소비 합계 (양수, 표시할 때 - 부호)
 *  - count:          후회 소비 건수
 *  - avgSatisfaction: 평균 만족도 (소수 1자리)
 */
function RegretSummaryCard({
  monthLabel = '이번 달',
  totalAmount,
  count,
  avgSatisfaction,
}) {
  return (
    <Card>
      <Left>
        <Caption>{monthLabel} 후회 소비</Caption>
        <Amount>{formatCurrency(totalAmount)}</Amount>
        <Detail>
          총 {count}건 · 평균 만족도 {avgSatisfaction.toFixed(1)}점
        </Detail>
      </Left>
      <Right>
        <Mochi expression="sad" size="lg" />
      </Right>
    </Card>
  );
}

export default RegretSummaryCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.accent.pointBox};
  border-radius: 18px;
  padding: 16px 18px;
  gap: 40px;
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 0;
`;

const Caption = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.yellowDark};
`;

const Amount = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
  line-height: 1.1;
`;

const Detail = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.accent.yellowDark};
  opacity: 0.85;
`;

const Right = styled.div`
  flex-shrink: 0;
`;
