import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MobileLayout from '../components/common/MobileLayout';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import { CATEGORY_LIST } from '../utils/constants';
import StarRating from '../components/archive/StarRating';

function Register() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [amount, setAmount] = useState('');
  const [form, setForm] = useState({
    category: 'food',
    date: today,
    title: '',
    memo: '',
    satisfaction: 3,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`등록 완료!\n${form.title} - ${Number(amount || 0).toLocaleString()}원`);
    navigate('/');
  };

  const selectedCat = CATEGORY_LIST.find((c) => c.key === form.category) ?? CATEGORY_LIST[0];

  return (
    <MobileLayout>
      <Header title="소비등록" showBack />

      <Form onSubmit={handleSubmit}>
        <AmountCard>
          <AmountHint>금액을 입력해주세요</AmountHint>
          <AmountRow>
            <AmountInput
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
            />
            <Won>원</Won>
          </AmountRow>
        </AmountCard>

        <FieldCard>
          <FieldRow type="button" onClick={() => {}}>
            <FieldLabel>카테고리</FieldLabel>
            <FieldValue>
              <CatBar $color={selectedCat.color} />
              {selectedCat.label}
            </FieldValue>
          </FieldRow>
          <Divider />
          <FieldRow>
            <FieldLabel>가격</FieldLabel>
            <FieldValue>{Number(amount || 0).toLocaleString()} 원</FieldValue>
          </FieldRow>
          <Divider />
          <FieldRow>
            <FieldLabel>결제일</FieldLabel>
            <DateInput
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </FieldRow>
          <Divider />
          <FieldRow>
            <FieldLabel>상호명</FieldLabel>
            <InlineInput
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="입력해주세요"
              required
            />
          </FieldRow>
        </FieldCard>

        <MemoCard>
          <FieldLabel>메모</FieldLabel>
          <Memo
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            placeholder="자유롭게 기록해보세요..."
            rows={3}
          />
        </MemoCard>

        <CategoryGrid>
          {CATEGORY_LIST.map((c) => (
            <CatChip
              key={c.key}
              type="button"
              $active={form.category === c.key}
              onClick={() => setForm({ ...form, category: c.key })}
            >
              <span>{c.emoji}</span>
              {c.label}
            </CatChip>
          ))}
        </CategoryGrid>

        <ReviewCard>
          <ReviewText>지난번 소비는 어떠셨나요?</ReviewText>
          <StarRating
            value={form.satisfaction}
            onChange={(v) => setForm({ ...form, satisfaction: v })}
            size="md"
          />
        </ReviewCard>

        <SaveBtn type="submit">저장</SaveBtn>
      </Form>

      <BottomNav />
    </MobileLayout>
  );
}

export default Register;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
`;

const AmountCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 12px 20px 20px;
  text-align: center;
`;

const AmountHint = styled.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(15, 19, 28, 0.4);
`;

const AmountRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
`;

const AmountInput = styled.input`
  border: none;
  outline: none;
  width: 120px;
  text-align: center;
  font-family: inherit;
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
  background: transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Won = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(15, 19, 28, 0.5);
`;

const FieldCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  overflow: hidden;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 52px;
  border: none;
  background: transparent;
  width: 100%;
  font-family: inherit;
  cursor: ${({ type }) => (type === 'button' ? 'pointer' : 'default')};
`;

const FieldLabel = styled.span`
  font-size: 13px;
  color: #77927e;
  font-weight: 500;
`;

const FieldValue = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.ink};
  font-weight: 500;
`;

const CatBar = styled.span`
  width: 8px;
  height: 30px;
  border-radius: 3px;
  background: ${({ $color }) => $color};
`;

const Divider = styled.hr`
  margin: 0 16px;
  border: none;
  border-top: 1px solid rgba(15, 19, 28, 0.08);
`;

const DateInput = styled.input`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  text-align: right;
  color: ${({ theme }) => theme.colors.text.ink};
  background: transparent;
`;

const InlineInput = styled.input`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  text-align: right;
  flex: 1;
  max-width: 180px;
  color: ${({ theme }) => theme.colors.text.ink};
  background: transparent;

  &::placeholder {
    color: rgba(15, 19, 28, 0.35);
  }
`;

const MemoCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Memo = styled.textarea`
  border: none;
  outline: none;
  resize: vertical;
  font-family: inherit;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.ink};
  background: transparent;

  &::placeholder {
    color: rgba(15, 19, 28, 0.35);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const CatChip = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  border: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors.text.brand2 : 'transparent'};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;

  span:first-child {
    font-size: 20px;
  }
`;

const ReviewCard = styled.div`
  background: rgba(255, 223, 74, 0.85);
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReviewText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent.yellowDark};
`;

const SaveBtn = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.text.ink};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
