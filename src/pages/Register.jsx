import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import MobileLayout from "../components/common/MobileLayout";
import Header from "../components/common/Header";
import StarRating from "../components/archive/StarRating";
import { useCategories } from "../hooks/useCategories";
import { useCreateTransaction } from "../hooks/useTransactions";
import { toDateKey } from "../utils/dateKey";
import {
  buildCreateTransactionPayload,
  getDefaultPaymentTime,
} from "../utils/buildCreateTransactionPayload";
import { getApiErrorMessage } from "../utils/apiError";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDate = location.state?.date || toDateKey(new Date());

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useCategories("EXPENSE");
  const createTx = useCreateTransaction();

  const [form, setForm] = useState({
    date: initialDate,
    time: getDefaultPaymentTime(initialDate),
    categoryId: null,
    merchantName: "",
    amount: "",
    memo: "",
    satisfaction: 0,
  });

  useEffect(() => {
    if (categories.length > 0 && form.categoryId == null) {
      setForm((prev) => ({ ...prev, categoryId: categories[0].categoryId }));
    }
  }, [categories, form.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "date") {
        next.time = getDefaultPaymentTime(value);
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload;
    try {
      payload = buildCreateTransactionPayload({
        type: "EXPENSE",
        amount: form.amount,
        categoryId: form.categoryId ?? categories[0]?.categoryId,
        date: form.date,
        time: form.time,
        merchantName: form.merchantName,
        memo: form.memo,
        satisfaction: form.satisfaction,
      });
    } catch (err) {
      if (err.message === "INVALID_AMOUNT") {
        alert("금액은 1원 이상 입력해 주세요.");
        return;
      }
      if (err.message === "CATEGORY_REQUIRED") {
        alert("카테고리를 선택해 주세요.");
        return;
      }
      alert("입력값을 확인해 주세요.");
      return;
    }

    try {
      await createTx.mutateAsync(payload);
      alert("내역이 등록되었습니다.");
      navigate("/", { replace: true });
    } catch (err) {
      alert(getApiErrorMessage(err, "등록에 실패했습니다."));
    }
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

        <FieldLabel>
          시간
          <Input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </FieldLabel>

        <div>
          <FieldSpan>카테고리 *</FieldSpan>
          {categoriesLoading ? (
            <Hint>카테고리 불러오는 중...</Hint>
          ) : categoriesError ? (
            <Hint>
              카테고리를 불러오지 못했어요.{" "}
              <RetryLink type="button" onClick={() => refetchCategories()}>
                다시 시도
              </RetryLink>
            </Hint>
          ) : categories.length === 0 ? (
            <EmptyCategory>
              <p>등록된 카테고리가 없습니다.</p>
              <p>
                서버에 기본 카테고리(식비·교통 등)가 없으면 이 화면이 비어
                있습니다. 백엔드에서 카테고리 시드 데이터를 넣거나,{" "}
                <code>POST /api/v1/categories</code>로 생성이 필요합니다.
              </p>
            </EmptyCategory>
          ) : (
            <CategoryGrid>
              {categories.map((c) => (
                <CatBtn
                  type="button"
                  key={c.categoryId}
                  $active={form.categoryId === c.categoryId}
                  onClick={() =>
                    setForm({ ...form, categoryId: c.categoryId })
                  }
                >
                  <CatDot $color={c.colorCode} />
                  <span>{c.name}</span>
                </CatBtn>
              ))}
            </CategoryGrid>
          )}
        </div>

        <FieldLabel>
          상호명 (선택)
          <Input
            type="text"
            name="merchantName"
            value={form.merchantName}
            onChange={handleChange}
            placeholder="예: 스타벅스 학교점"
            maxLength={20}
          />
        </FieldLabel>

        <FieldLabel>
          금액 *
          <AmountWrap>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              min={1}
              required
            />
            <Won>원</Won>
          </AmountWrap>
        </FieldLabel>

        <FieldLabel>
          메모 (선택)
          <Textarea
            name="memo"
            value={form.memo}
            onChange={handleChange}
            placeholder="간단한 메모를 남겨보세요"
            maxLength={255}
            rows={3}
          />
        </FieldLabel>

        <div>
          <FieldSpan>만족도 (선택)</FieldSpan>
          <StarRow>
            <StarRating
              value={form.satisfaction}
              onChange={(score) =>
                setForm((prev) => ({
                  ...prev,
                  satisfaction: prev.satisfaction === score ? 0 : score,
                }))
              }
            />
            {form.satisfaction > 0 && (
              <ClearSat type="button" onClick={() => setForm((p) => ({ ...p, satisfaction: 0 }))}>
                선택 해제
              </ClearSat>
            )}
          </StarRow>
        </div>

        <PrimaryButton
          type="submit"
          disabled={
            createTx.isPending ||
            categories.length === 0 ||
            form.categoryId == null
          }
        >
          {createTx.isPending ? "등록 중..." : "등록하기"}
        </PrimaryButton>
        {categories.length === 0 && !categoriesLoading && !categoriesError && (
          <SubmitHint>카테고리가 없어 등록할 수 없습니다.</SubmitHint>
        )}
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
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
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

const Hint = styled.p`
  margin: 0;
  font-size: 13px;
  color: #999;
`;

const EmptyCategory = styled.div`
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;

  p {
    margin: 0 0 8px;
  }

  code {
    font-size: 12px;
    background: #f0f0f0;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const SubmitHint = styled.p`
  margin: -8px 0 0;
  text-align: center;
  font-size: 12px;
  color: #c45c5c;
`;

const RetryLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: #0f131c;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
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
  gap: 6px;
  padding: 12px 8px;
  background: ${({ $active }) => ($active ? "#fff" : "#f7f6f3")};
  border: 2px solid ${({ $active }) => ($active ? "#0f131c" : "transparent")};
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #444;
`;

const CatDot = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#ccc"};
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

const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ClearSat = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-family: inherit;
  font-size: 12px;
  color: #77927e;
  cursor: pointer;
  text-decoration: underline;
`;
