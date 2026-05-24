import styled from 'styled-components';
import { CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatKoreanTime } from '../../utils/dateUtils';
import StarRating from './StarRating';

/**
 * 소비 카드. 좌측 카테고리 색 막대 + 정보 + 우측 금액/별점.
 *
 * <ExpenseCard expense={...} onClick={() => openDetail(item)} />
 *
 * props:
 *  - expense: { id, title, categoryKey, amount, date, satisfaction }
 *  - onClick: (선택) 카드 클릭 핸들러
 */
function ExpenseCard({ expense, onClick }) {
  const cat = CATEGORIES[expense.categoryKey] ?? CATEGORIES.etc;

  return (
    <Card type="button" onClick={onClick}>
      <ColorBar $color={cat.color} />
      <Body>
        <Info>
          <Title>{expense.title}</Title>
          <Sub>
            <span>{cat.label}</span>
            <Dot>·</Dot>
            <span>{formatKoreanTime(expense.date)}</span>
          </Sub>
        </Info>
        <Right>
          <Amount>{formatCurrency(expense.amount)}</Amount>
          <StarRating value={expense.satisfaction ?? 0} size="sm" />
        </Right>
      </Body>
    </Card>
  );
}

export default ExpenseCard;

const Card = styled.button`
  display: flex;
  align-items: stretch;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.card};
  overflow: hidden;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  transition: box-shadow 0.15s, transform 0.15s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
    transform: translateY(-1px);
  }
`;

const ColorBar = styled.div`
  width: 5px;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  min-width: 0; /* flex 안에서 자식 ellipsis 동작용 */
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.ink};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sub = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Dot = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.5;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`;

const Amount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
`;
