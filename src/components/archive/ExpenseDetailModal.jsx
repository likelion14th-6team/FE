import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Button from '../common/Button';
import StarRating from './StarRating';

import { CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatKoreanTime } from '../../utils/dateUtils';

/**
 * 소비 상세 바텀시트 모달.
 *
 * <ExpenseDetailModal
 *   expense={selectedExpense}     // null이면 안 보임
 *   onClose={() => setSelected(null)}
 * />
 *
 * - backdrop 탭 / ESC 키 → 닫힘
 * - 수정/삭제 버튼 → 일단 console.log
 */
function ExpenseDetailModal({ expense, onClose }) {
  // ESC로 닫기 — 모달이 열린 동안에만 리스너 등록
  useEffect(() => {
    if (!expense) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [expense, onClose]);

  // 모달 떠 있을 때 배경 스크롤 잠금
  useEffect(() => {
    if (!expense) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [expense]);

  if (!expense) return null;

  const cat = CATEGORIES[expense.categoryKey] ?? CATEGORIES.etc;
  const dateObj = new Date(expense.date);
  const ymd = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  const handleEdit = () => {
    // TODO: 수정 페이지 이동 또는 인라인 편집
    console.log('[expense] edit', expense.id);
  };

  const handleDelete = () => {
    // TODO: 삭제 확인 다이얼로그 → API DELETE
    console.log('[expense] delete', expense.id);
  };

  return (
    <>
      <Backdrop onClick={onClose} aria-hidden="true" />
      <Sheet
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-detail-title"
      >
        <Handle aria-hidden="true" />

        <TitleRow>
          <ColorDot $color={cat.color} />
          <SheetTitle id="expense-detail-title">{expense.title}</SheetTitle>
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
      </Sheet>
    </>
  );
}

export default ExpenseDetailModal;

/* ===== 애니메이션 ===== */

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translate(-50%, 100%); }
  to   { transform: translate(-50%, 0); }
`;

/* ===== 스타일 ===== */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  animation: ${fadeIn} 0.18s ease-out;
`;

const Sheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.mobileMaxWidth};
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 12px 24px 32px;
  z-index: 1001;
  animation: ${slideUp} 0.22s ease-out;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

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
