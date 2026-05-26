import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 페이지 상단 헤더. 두 가지 정렬 모드.
 *
 * align="center" (기본, 디자인 시안 기준)
 *   한 줄: [좌측 빈 자리] [중앙 타이틀] [우측 슬롯]
 *   subtitle 무시 (가운데 헤더에는 안 씀)
 *
 *   <Header title="아카이브" rightSlot={<SearchIcon />} />
 *   <Header title="마이페이지" />
 *
 * align="left"
 *   두 줄: [뒤로가기/우측 슬롯] / [타이틀 + 서브타이틀]
 *
 *   <Header align="left" title="설정" subtitle="앱 정보를 확인하세요" showBack />
 */
function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightSlot,
  align = 'center',
}) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));

  if (align === 'center') {
    return (
      <CenterWrapper>
        {showBack ? (
          <BackButton onClick={handleBack} aria-label="뒤로 가기">
            ←
          </BackButton>
        ) : (
          <Spacer />
        )}
        <CenterTitle>{title}</CenterTitle>
        <SlotBox>{rightSlot ?? <Spacer />}</SlotBox>
      </CenterWrapper>
    );
  }

  // align === 'left'
  return (
    <LeftWrapper>
      <TopRow>
        {showBack ? (
          <BackButton onClick={handleBack} aria-label="뒤로 가기">
            ←
          </BackButton>
        ) : (
          <Spacer />
        )}
        <SlotBox>{rightSlot}</SlotBox>
      </TopRow>
      <TitleArea>
        <LeftTitle>{title}</LeftTitle>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleArea>
    </LeftWrapper>
  );
}

export default Header;

/* ===== 공통 ===== */

const Spacer = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
`;

const SlotBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 36px;
  flex-shrink: 0;
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
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.whiteAlpha85};
  }
`;

/* ===== align="center" ===== */

const CenterWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 16px;
  min-height: 60px;
`;

const CenterTitle = styled.h1`
  font-family: inherit;
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.ink};
  margin: 0;
  text-align: center;
  flex: 1;
`;

/* ===== align="left" ===== */

const LeftWrapper = styled.header`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
`;

const TitleArea = styled.div`
  padding-top: 16px;
`;

const LeftTitle = styled.h1`
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
