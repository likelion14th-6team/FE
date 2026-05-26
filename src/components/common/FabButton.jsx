import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FabButton() {
  const navigate = useNavigate();

  return (
    <Button type="button" onClick={() => navigate('/register')} aria-label="소비 등록">
      +
    </Button>
  );
}

export default FabButton;

const Button = styled.button`
  position: fixed;
  right: max(20px, calc((100vw - ${({ theme }) => theme.layout.mobileMaxWidth}) / 2 + 20px));
  bottom: 96px;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.circle};
  background: ${({ theme }) => theme.colors.nav.fill};
  color: ${({ theme }) => theme.colors.white};
  font-size: 28px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(107, 191, 170, 0.45);
  z-index: 20;
  font-family: inherit;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    right: 20px;
  }
`;
