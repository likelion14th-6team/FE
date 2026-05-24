import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 페이지 상단 헤더.
 * - 뒤로가기 / 타이틀 / 서브타이틀 / 우측 슬롯 4영역.
 *
 * 사용 예:
 *   <Header title="아카이브" subtitle="지난 소비를 돌아보세요" showBack />
 *   <Header title="마이페이지" showBack rightSlot={<button>설정</button>} />
 */
function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightSlot,
}) {
  const navigate = useNavigate();

  // onBack을 안 넘기면 디폴트로 history.back() 동작
  const handleBack = onBack ?? (() => navigate(-1));

  return (
    <Wrapper>
      <TopRow>
        {showBack ? (
          <BackButton onClick={handleBack} aria-label="뒤로 가기">
            ←
          </BackButton>
        ) : (
          // 좌측이 비어도 우측이 항상 같은 위치에 오도록 자리 차지용
          <Spacer />
        )}
        <RightSlot>{rightSlot}</RightSlot>
      </TopRow>
      <TitleArea>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleArea>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
`;

const Spacer = styled.div`
  width: 36px;
  height: 36px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.whiteAlpha60};
  border: none;
  border-radius: ${({ theme }) => theme.radius.circle};
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.ink};
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.whiteAlpha85};
  }
`;

const RightSlot = styled.div`
  display: flex;
  align-items: center;
`;

const TitleArea = styled.div`
  padding-top: 16px;
`;

const Title = styled.h1`
  font-family: inherit;
  font-weight: 800;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text.ink};
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 300;
  margin: 6px 0 0;
`;
