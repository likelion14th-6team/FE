import styled, { css } from 'styled-components';

/**
 * 공통 버튼.
 * - variant: primary | secondary | danger
 * - size:    sm | md | lg
 * - fullWidth, disabled, type, onClick, children
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

// 크기별 스타일 묶음 — css 헬퍼로 여러 CSS 속성을 한 덩어리로 묶어 재사용.
const sizeStyles = {
  sm: css`
    height: 36px;
    padding: 0 16px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `,
  md: css`
    height: 44px;
    padding: 0 20px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  lg: css`
    height: 52px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.fontSizes.base};
  `,
};

// 색상 variant별 스타일 묶음
const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.text.brand};
    color: ${({ theme }) => theme.colors.white};
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text.brand};
    border: 1px solid ${({ theme }) => theme.colors.text.brand};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.mint.light};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
};

const StyledButton = styled.button`
  /* 공통 베이스 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* variant + size 별 스타일을 끼워넣음 */
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
