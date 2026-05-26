import styled from 'styled-components';

import Modal from '../common/Modal';
import Button from '../common/Button';
import StarRating from './StarRating';

import { CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatKoreanTime } from '../../utils/dateUtils';

/**
 * 소비 상세 바텀시트.
 * 공통 <Modal variant="sheet"> 위에 콘텐츠만 얹은 형태.
 *
 * <ExpenseDetailModal
 *   expense={selectedExpense}   // null이면 안 보임
 *   onClose={() => setSelected(null)}
 * />
 */
function ExpenseDetailModal({ expense, onClose }) {
  const open = !!expense;

  // expense가 null이어도 안전하도록 가드
  if (!expense) {
    return <Modal open={false} onClose={onClose} variant="sheet" />;
  }

  const cat = CATEGORIES[expense.categoryKey] ?? CATEGORIES.etc;
  const dateObj = new Date(expense.date);
  const ymd = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  const handleEdit = () => console.log('[expense] edit', expense.id);
  const handleDelete = () => console.log('[expense] delete', expense.id);

  return (
    <Modal open={open} onClose={onClose} variant="sheet" ariaLabel={expense.title}>
      <Handle aria-hidden="true" />

      <TitleRow>
        <ColorDot $color={cat.color} />
        <SheetTitle>{expense.title}</SheetTitle>
      </TitleRow>

      <InfoList>
        <InfoRow>
          <InfoLabel>카테고리</InfoLabel>
          <InfoValue>
            <CategoryEmoji>{cat.emoji}</CategoryEmoji>
            {cat.label}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>금액</InfoLabel>
          <AmountValue>{formatCurrency(expense.amount)}</AmountValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>만족도</InfoLabel>
          <InfoValue>
            <StarRating value={expense.satisfaction ?? 0} size="md" />
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>일시</InfoLabel>
          <InfoValue>
            {ymd} · {formatKoreanTime(dateObj)}
          </InfoValue>
        </InfoRow>
      </InfoList>

      {expense.memo && (
        <MemoSection>
          <MemoLabel>📝 메모</MemoLabel>
          <MemoText>{expense.memo}</MemoText>
        </MemoSection>
      )}

      <Footer>
        <Button variant="secondary" size="lg" fullWidth onClick={handleEdit}>
          수정
        </Button>
        <Button variant="danger" size="lg" fullWidth onClick={handleDelete}>
          삭제
        </Button>
      </Footer>
    </Modal>
  );
}

export default ExpenseDetailModal;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.15);
  margin: 0 auto;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const SheetTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
  margin: 0;
  flex: 1;
  word-break: keep-all;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  flex-shrink: 0;
`;

const InfoValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.ink};
  font-weight: 600;
  text-align: right;
`;

const CategoryEmoji = styled.span`
  font-size: 16px;
`;

const AmountValue = styled(InfoValue)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
`;

const MemoSection = styled.div`
  background: ${({ theme }) => theme.colors.mint.light};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MemoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.brand};
`;

const MemoText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.ink};
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 6px;
`;
