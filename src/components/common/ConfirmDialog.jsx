import styled from 'styled-components';
import Modal from './Modal';
import Button from './Button';

/**
 * 확인 다이얼로그 (Yes/No 형식).
 *
 * <ConfirmDialog
 *   open={openLogout}
 *   onClose={() => setOpenLogout(false)}
 *   title="로그아웃 하시겠어요?"
 *   description="다시 로그인하면 돌아올 수 있어요."
 *   confirmLabel="로그아웃"
 *   cancelLabel="취소"
 *   onConfirm={handleLogout}
 *   confirmVariant="primary"  // primary | danger
 * />
 */
function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  confirmVariant = 'primary',
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} variant="center" ariaLabel={title}>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      <Footer>
        <Button variant="secondary" size="md" fullWidth onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant={confirmVariant} size="md" fullWidth onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </Footer>
    </Modal>
  );
}

export default ConfirmDialog;

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
  white-space: pre-line;
  word-break: keep-all;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 4px;
`;
