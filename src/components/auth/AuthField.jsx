import styled from 'styled-components';

function AuthField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  action,
}) {
  return (
    <FieldWrap>
      <InputBox>
        <Label>{label}</Label>
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </InputBox>
      {action}
    </FieldWrap>
  );
}

export default AuthField;

const FieldWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const InputBox = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 16px 20px;
  min-width: 0;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.brand2};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  /* GeekbleMalang은 password 마스킹(•) 글리프가 없어서 시스템 폰트로 fallback.
     별점 ★도 같은 이슈로 시스템 폰트로 처리했음. */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.ink};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.gray};
    font-family: inherit;
  }
`;
