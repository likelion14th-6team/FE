import styled from "styled-components";

function AuthField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  action,
}) {
  return (
    <FieldWrap $hasAction={!!action}>
      <Label>{label}</Label>
      <InputBoxWrap>
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        {action && <ActionWrap>{action}</ActionWrap>}
      </InputBoxWrap>
    </FieldWrap>
  );
}

export default AuthField;

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.brand2};
`;

const InputBoxWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 16px 20px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family:
    GeekbleMalang,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    system-ui,
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.ink};

  &[type="password"] {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      system-ui,
      sans-serif;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.gray};
    font-family:
      GeekbleMalang,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      system-ui,
      sans-serif;
  }
`;

const ActionWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;
