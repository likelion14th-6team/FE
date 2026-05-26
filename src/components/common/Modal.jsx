import { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

/**
 * 공통 모달.
 *  - variant="sheet":  화면 하단 바텀시트 (슬라이드 업)
 *  - variant="center": 화면 중앙 다이얼로그 (페이드 인 + 살짝 확대)
 *
 * <Modal open={...} onClose={...} variant="center">
 *   <p>정말 탈퇴할까요?</p>
 * </Modal>
 *
 * 공통 동작:
 *  - backdrop 클릭 → onClose
 *  - ESC 키 → onClose
 *  - 열린 동안 배경 스크롤 잠금
 */
function Modal({ open, onClose, variant = 'sheet', children, ariaLabel }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} aria-hidden="true" />
      {variant === 'sheet' ? (
        <Sheet role="dialog" aria-modal="true" aria-label={ariaLabel}>
          {children}
        </Sheet>
      ) : (
        <CenterBox role="dialog" aria-modal="true" aria-label={ariaLabel}>
          {children}
        </CenterBox>
      )}
    </>
  );
}

export default Modal;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translate(-50%, 100%); }
  to   { transform: translate(-50%, 0); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  animation: ${fadeIn} 0.18s ease-out;
`;

const baseSurface = css`
  position: fixed;
  z-index: 1001;
  background: ${({ theme }) => theme.colors.white};
`;

const Sheet = styled.div`
  ${baseSurface}
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.mobileMaxWidth};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 12px 24px 32px;
  animation: ${slideUp} 0.22s ease-out;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CenterBox = styled.div`
  ${baseSurface}
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 40px);
  max-width: 400px;
  border-radius: 20px;
  padding: 24px 22px 22px;
  animation: ${popIn} 0.18s ease-out;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
