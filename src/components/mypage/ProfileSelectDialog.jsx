import { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Button from "../common/Button";
import {
  AGE_MAP,
  AGE_OPTIONS,
  GENDER_MAP,
  GENDER_FROM_API,
  AGE_FROM_API,
} from "../../constants/profileEnums";

function ProfileSelectDialog({
  open,
  onClose,
  kind,
  initialGenderApi,
  initialAgeGroupApi,
  onSubmit,
}) {
  const isGender = kind === "gender";
  const [gender, setGender] = useState("male");
  const [ageGroup, setAgeGroup] = useState("20대");

  useEffect(() => {
    if (!open) return;
    if (isGender) {
      setGender(GENDER_FROM_API[initialGenderApi] || "male");
    } else {
      setAgeGroup(AGE_FROM_API[initialAgeGroupApi] || "20대");
    }
  }, [open, isGender, initialGenderApi, initialAgeGroupApi]);

  const title = isGender ? "성별 등록" : "연령대 등록";
  const description = isGender
    ? "카카오 가입 시 성별은 나중에 등록할 수 있어요."
    : "카카오 가입 시 연령대는 나중에 등록할 수 있어요.";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGender) {
      onSubmit?.({ gender: GENDER_MAP[gender] });
    } else {
      onSubmit?.({ ageGroup: AGE_MAP[ageGroup] });
    }
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} variant="center" ariaLabel={title}>
      <Form onSubmit={handleSubmit}>
        <Title>{title}</Title>
        <Description>{description}</Description>

        {isGender ? (
          <GenderBtns>
            <GenderBtn
              type="button"
              $active={gender === "male"}
              onClick={() => setGender("male")}
            >
              남
            </GenderBtn>
            <GenderBtn
              type="button"
              $active={gender === "female"}
              onClick={() => setGender("female")}
            >
              여
            </GenderBtn>
          </GenderBtns>
        ) : (
          <AgeSelect
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </AgeSelect>
        )}

        <Footer>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            type="button"
            onClick={onClose}
          >
            취소
          </Button>
          <Button variant="primary" size="md" fullWidth type="submit">
            저장
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

export default ProfileSelectDialog;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.ink};
  text-align: center;
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.5;
  word-break: keep-all;
`;

const GenderBtns = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const GenderBtn = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.nav.fill : theme.colors.mint.light};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.text.ink};
`;

const AgeSelect = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mint.light};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.ink};
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 6px;
`;
