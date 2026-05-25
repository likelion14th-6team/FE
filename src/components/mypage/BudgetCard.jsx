import styled from 'styled-components';
import EditChip from './EditChip';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * 이번 달 예산 카드.
 *
 * <BudgetCard amount={500000} onEdit={() => ...} />
 *
 * props:
 *  - amount:     예산 금액 (양수)
 *  - monthLabel: 상단 캡션 (기본 "이번 달 총 예산")
 *  - onEdit:     수정 버튼 클릭 핸들러
 */
function BudgetCard({ amount, monthLabel = '이번 달 총 예산', onEdit }) {
  return (
    <Card>
      <Left>
        <Caption>{monthLabel}</Caption>
        <Amount>{formatCurrency(amount, { signed: false })}</Amount>
      </Left>
      <EditChip variant="edit" onClick={onEdit} />
    </Card>
  );
}

export default BudgetCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 18px 20px;
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

const Caption = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const Amount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
`;
