import styled from "styled-components";

/**
 * 정보 행의 우측에 들어가는 작은 칩.
 *  - variant="edit":     노란 "수정" 버튼 (클릭 가능)
 *  - variant="disabled": 회색 "불가" 라벨 (클릭 불가, 카카오 가입자용)
 *
 * <EditChip variant="edit" onClick={handleEdit} />
 * <EditChip variant="disabled" />
 *
 * label은 기본값 자동 ("수정"/"불가"), 직접 override 가능.
 */
function EditChip({ variant = "edit", onClick, label }) {
  const displayLabel = label ?? (variant === "disabled" ? "불가" : "수정");
  return (
    <Chip
      type="button"
      $variant={variant}
      onClick={variant === "disabled" ? undefined : onClick}
      disabled={variant === "disabled"}
    >
      {displayLabel}
    </Chip>
  );
}

export default EditChip;

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 10px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  cursor: ${({ $variant }) =>
    $variant === "disabled" ? "not-allowed" : "pointer"};

  background: ${({ theme, $variant }) =>
    $variant === "disabled" ? "#E5E5E5" : theme.colors.accent.yellow};
  color: ${({ theme, $variant }) =>
    $variant === "disabled" ? "#999999" : theme.colors.accent.yellowDark};

  &:hover:not(:disabled) {
    opacity: 0.85;
  }
`;
