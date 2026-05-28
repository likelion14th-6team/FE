import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import Button from './Button';

/**
 * 단일 입력 다이얼로그.
 *
 * <InputDialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="별명 수정"
 *   label="새 별명"
 *   placeholder="멋쟁이사자"
 *   initialValue={user.nickname}
 *   onSubmit={(v) => updateNickname(v)}
 *   validate={(v) => v.length >= 1 && v.length <= 20 ? null : '1~20자로 입력해주세요'}
 *   inputType="text"        // 'text' | 'number' | 'password'
 *   confirmLabel="저장"
 *   suffix="원"             // 입력 우측 보조 텍스트 (선택)
 *   formatDisplay={(v) => v.toLocaleString()}  // 표시용 포맷 함수 (선택)
 * />
 */
function InputDialog({
  open,
  onClose,
  title,
  description,
  label,
  placeholder,
  initialValue = '',
  onSubmit,
  validate,
  inputType = 'text',
  confirmLabel = '저장',
  cancelLabel = '취소',
  suffix,
  formatDisplay,
}) {
  const [value, setValue] = useState(String(initialValue));
  const [touched, setTouched] = useState(false);

  // 모달이 열릴 때마다 초기값으로 리셋
  useEffect(() => {
    if (open) {
      setValue(String(initialValue));
      setTouched(false);
    }
  }, [open, initialValue]);

  const error = touched && validate ? validate(value) : null;
  const canSubmit = !error && value.trim().length > 0;

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    setTouched(true);
    const err = validate?.(value);
    if (err) return;
    onSubmit?.(value);
    onClose?.();
  };

  // 숫자 입력: 콤마 표시
  const displayValue =
    inputType === 'number' && formatDisplay && value
      ? formatDisplay(Number(value.replace(/[^0-9]/g, '')))
      : value;

  const handleChange = (e) => {
    let next = e.target.value;
    // 숫자 입력: 콤마/공백 제거 후 숫자만
    if (inputType === 'number') {
      next = next.replace(/[^0-9]/g, '');
    }
    setValue(next);
    if (!touched) setTouched(true);
  };

  return (
    <Modal open={open} onClose={onClose} variant="center" ariaLabel={title}>
      <Form onSubmit={handleSubmit}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}

        <Field>
          {label && <Label>{label}</Label>}
          <InputWrap $error={!!error}>
            <Input
              type={inputType === 'number' ? 'text' : inputType}
              inputMode={inputType === 'number' ? 'numeric' : undefined}
              value={displayValue}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              placeholder={placeholder}
              autoFocus
            />
            {suffix && <Suffix>{suffix}</Suffix>}
          </InputWrap>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </Field>

        <Footer>
          <Button variant="secondary" size="md" fullWidth onClick={onClose} type="button">
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            type="submit"
            disabled={!canSubmit}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

export default InputDialog;

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

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.5;
  word-break: keep-all;
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
  gap: 8px;
  padding: 0 14px;
  height: 48px;
  border: 1.5px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.danger : 'rgba(0, 0, 0, 0.08)'};
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
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.ink};
  font-weight: 600;
  min-width: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 400;
  }
`;

const Suffix = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
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
