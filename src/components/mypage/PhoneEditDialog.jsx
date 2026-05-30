import { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Button from "../common/Button";
import PhoneNumberInput from "../auth/PhoneNumberInput";

function validatePhone(value) {
  const digits = value.replace(/[^0-9]/g, "");
  if (digits.length < 10 || digits.length > 11) {
    return "올바른 전화번호를 입력해주세요";
  }
  return null;
}

function PhoneEditDialog({
  open,
  onClose,
  initialValue = "",
  onSubmit,
  title = "전화번호 등록",
  description = "카카오 가입 시 전화번호는 나중에 등록할 수 있어요.",
}) {
  const [phone, setPhone] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setPhone(initialValue || "");
      setTouched(false);
    }
  }, [open, initialValue]);

  const error = touched ? validatePhone(phone) : null;
  const canSubmit = !error && phone.replace(/[^0-9]/g, "").length >= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validatePhone(phone);
    if (err) return;
    onSubmit?.(phone);
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} variant="center" ariaLabel={title}>
      <Form onSubmit={handleSubmit}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <PhoneNumberInput
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (!touched) setTouched(true);
          }}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Footer>
          <Button variant="secondary" size="md" fullWidth type="button" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" size="md" fullWidth type="submit" disabled={!canSubmit}>
            저장
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

export default PhoneEditDialog;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
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

const ErrorMsg = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.danger};
  padding-left: 4px;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 6px;
`;
