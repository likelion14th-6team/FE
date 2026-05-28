import { useRef } from "react";
import styled from "styled-components";

function PhoneNumberInput({
  value,
  onChange,
  placeholder = "010-0000-0000",
  required,
}) {
  const [part1 = "", part2 = "", part3 = ""] = value
    ? value.split("-")
    : ["", "", ""];

  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  const limits = [3, 4, 4];

  const handleChange = (index, inputValue) => {
    // 숫자만 추출
    const numOnly = inputValue.replace(/[^0-9]/g, "");

    if (numOnly.length > limits[index]) return;

    // 새 값 배열 생성
    const newParts = [part1, part2, part3];
    newParts[index] = numOnly;

    // 부모 컴포넌트에 전달
    onChange({
      target: {
        value: newParts.filter((p) => p !== "").join("-"),
      },
    });

    // 현재 필드가 가득 차면 다음 필드로 포커스 이동
    if (numOnly.length === limits[index] && index < 2) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !part1 && !part2 && !part3) return;

    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <PhoneInputWrap>
      <PhoneInput
        ref={inputRefs[0]}
        type="tel"
        inputMode="numeric"
        maxLength="3"
        value={part1}
        onChange={(e) => handleChange(0, e.target.value)}
        onKeyDown={(e) => handleKeyDown(0, e)}
        placeholder="010"
        required={required}
      />
      <Separator>-</Separator>
      <PhoneInput
        ref={inputRefs[1]}
        type="tel"
        inputMode="numeric"
        maxLength="4"
        value={part2}
        onChange={(e) => handleChange(1, e.target.value)}
        onKeyDown={(e) => handleKeyDown(1, e)}
        placeholder="0000"
      />
      <Separator>-</Separator>
      <PhoneInput
        ref={inputRefs[2]}
        type="tel"
        inputMode="numeric"
        maxLength="4"
        value={part3}
        onChange={(e) => handleChange(2, e.target.value)}
        onKeyDown={(e) => handleKeyDown(2, e)}
        placeholder="0000"
      />
    </PhoneInputWrap>
  );
}

export default PhoneNumberInput;

const PhoneInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 16px 20px;
`;

const PhoneInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.ink};
  text-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.gray};
  }

  /* 숫자 입력 필드 스피너 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.text.gray};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;
