import { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Button from "../common/Button";

/**
 * 비밀번호 변경 모달. 현재/새/새 확인 3 입력.
 *
 * <PasswordEditModal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onSubmit={(currentPw, newPw) => api.changePw(...)}
 * />
 *
 * 백엔드 정책: 영문+숫자+특수문자 포함, 8자 이상.
 */
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!-/:-@[-`{-~]).{8,}$/;

function PasswordEditModal({ open, onClose, onSubmit }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (open) {
      setCurrent("");
      setNext("");
      setConfirm("");
      setTouched({});
    }
  }, [open]);

  const errors = {
    current:
      touched.current && !current ? "현재 비밀번호를 입력해주세요" : null,
    next:
      touched.next && !PW_REGEX.test(next)
        ? "영문/숫자/특수문자 포함 8자 이상"
        : null,
    confirm:
      touched.confirm && next !== confirm ? "비밀번호가 일치하지 않아요" : null,
  };

  const canSubmit = current && PW_REGEX.test(next) && next === confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ current: true, next: true, confirm: true });
    if (!canSubmit) return;
    onSubmit?.(current, next);
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="center"
      ariaLabel="비밀번호 변경"
    >
      <Form onSubmit={handleSubmit}>
        <Title>비밀번호 변경</Title>

        <Field>
          <Label>현재 비밀번호</Label>
          <InputWrap $error={!!errors.current}>
            <Input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, current: true }))}
              placeholder="현재 비밀번호"
              autoFocus
            />
          </InputWrap>
          {errors.current && <ErrorMsg>{errors.current}</ErrorMsg>}
        </Field>

        <Field>
          <Label>새 비밀번호</Label>
          <InputWrap $error={!!errors.next}>
            <Input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, next: true }))}
              placeholder="영문/숫자/특수문자 포함 8자 이상"
            />
          </InputWrap>
          {errors.next && <ErrorMsg>{errors.next}</ErrorMsg>}
        </Field>

        <Field>
          <Label>새 비밀번호 확인</Label>
          <InputWrap $error={!!errors.confirm}>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
              placeholder="다시 한 번 입력"
            />
          </InputWrap>
          {errors.confirm && <ErrorMsg>{errors.confirm}</ErrorMsg>}
        </Field>

        <Footer>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={onClose}
            type="button"
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            type="submit"
            disabled={!canSubmit}
          >
            변경
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

export default PasswordEditModal;

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
  padding-top: 4px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 44px;
  border: 1.5px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.danger : "rgba(0, 0, 0, 0.08)"};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mint.light};

  &:focus-within {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.danger : theme.colors.text.brand};
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.ink};
  font-weight: 600;
  min-width: 0;

  &[type="password"] {
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 400;
  }
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
