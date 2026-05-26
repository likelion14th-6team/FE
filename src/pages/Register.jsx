import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MobileLayout from "../components/common/MobileLayout";
import Header from "../components/common/Header";

const CATEGORIES = [
  { id: "food", label: "식비", emoji: "🍚" },
  { id: "cafe", label: "카페", emoji: "☕" },
  { id: "transport", label: "교통", emoji: "🚇" },
  { id: "culture", label: "문화", emoji: "🎬" },
  { id: "shopping", label: "쇼핑", emoji: "🛍️" },
  { id: "etc", label: "기타", emoji: "✨" },
];

function Register() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    date: today,
    category: "food",
    title: "",
    amount: "",
    memo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `등록 완료!\n${form.title} - ${Number(form.amount).toLocaleString()}원`,
    );
    navigate("/archive");
  };

  return (
    <MobileLayout $hasBottomNav={false}>
      <Header title="소비 등록" showBack />

      <FormCard onSubmit={handleSubmit}>
        <FieldLabel>
          날짜
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </FieldLabel>

        <div>
          <FieldSpan>카테고리</FieldSpan>
          <CategoryGrid>
            {CATEGORIES.map((c) => (
              <CatBtn
                type="button"
                key={c.id}
                $active={form.category === c.id}
                onClick={() => setForm({ ...form, category: c.id })}
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </CatBtn>
            ))}
          </CategoryGrid>
        </div>

        <FieldLabel>
          내용
          <Input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="예: 점심 - 김치찌개"
            required
          />
        </FieldLabel>

        <FieldLabel>
          금액
          <AmountWrap>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              required
            />
            <Won>원</Won>
          </AmountWrap>
        </FieldLabel>

        <FieldLabel>
          메모
          <Textarea
            name="memo"
            value={form.memo}
            onChange={handleChange}
            placeholder="간단한 메모를 남겨보세요 (선택)"
            rows={3}
          />
        </FieldLabel>

        <PrimaryButton type="submit">등록하기</PrimaryButton>
      </FormCard>

    </MobileLayout>
  );
}

export default Register;


const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #0f131c;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    opacity: 0.85;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(15, 19, 28, 0.12);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  background: rgba(255, 255, 255, 0.7);
  &:focus {
    border-color: #0f131c;
    background: #fff;
  }
`;

const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 500;
  color: #77927e;
  font-size: 13px;
`;


const FormCard = styled.form`
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const FieldSpan = styled.span`
  display: block;
  font-weight: 500;
  color: #77927e;
  font-size: 13px;
  margin-bottom: 8px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const CatBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 14px 8px;
  background: ${({ $active }) => ($active ? "#fff" : "#f7f6f3")};
  border: 2px solid ${({ $active }) => ($active ? "#0f131c" : "transparent")};
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  span:first-child {
    font-size: 22px;
  }
  span:last-child {
    font-size: 12px;
    font-weight: 500;
    color: #444;
  }
`;

const AmountWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Won = styled.span`
  position: absolute;
  right: 14px;
  color: #aaa;
  font-weight: 500;
  pointer-events: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(15, 19, 28, 0.12);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  background: rgba(255, 255, 255, 0.7);
  &:focus {
    border-color: #0f131c;
    background: #fff;
  }
`;
