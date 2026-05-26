// 디자인 토큰 — styled-components ThemeProvider에 주입되는 단일 객체.
// 사용법:
//   const Card = styled.div`
//     background: ${({ theme }) => theme.colors.mint.light};
//     border-radius: ${({ theme }) => theme.radius.card};
//   `;

const theme = {
  // 색상 팔레트
  colors: {
    // 배경 그라데이션용 (GlobalStyle에서 이미 body에 적용 중)
    mint: {
      light: '#D6EDE5',
      mid: '#CEECC4',
      dark: '#ACDAC1',
    },
    // 텍스트
    text: {
      primary: '#2C3E2D',   // 본문 메인
      secondary: '#7A8F7C', // 보조
      brand: '#1A4D3A',     // 강조/제목
      ink: '#0f131c',       // 기존 페이지가 쓰는 잉크 컬러 (호환용)
    },
    // 포인트
    accent: {
      yellow: '#FFE066',
      yellowDark: '#6B5B0C', // 옐로우 위 텍스트
    },
    // 상태
    danger: '#FF8B8B',
    star: {
      active: '#FFC93C',
      inactive: '#B8B8B8',
    },
    // 카테고리 (소비 분류)
    category: {
      food: '#FFB088',
      transport: '#A5C9E0',
      shopping: '#F5A8B8',
      culture: '#C5A8E0',
      clothing: '#FFD479',
      etc: '#B8B8B8',
    },
    // 흰색/투명
    white: '#FFFFFF',
    whiteAlpha60: 'rgba(255, 255, 255, 0.6)',
    whiteAlpha85: 'rgba(255, 255, 255, 0.85)',
  },

  // 폰트 크기 — 2px 단위, 최대 20px
  fontSizes: {
    caption: '10px',
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
  },

  // 모서리
  radius: {
    card: '16px',
    page: '24px',
    pill: '20px',
    circle: '50%',
  },

  // 그림자
  shadow: {
    card: '0 4px 12px rgba(26, 77, 58, 0.06)',
    cardSoft: '0 2px 12px rgba(0, 0, 0, 0.05)',
    cardHover: '0 6px 20px rgba(0, 0, 0, 0.09)',
  },

  // 레이아웃
  layout: {
    mobileBaseWidth: '393px',   // 디자인 기준 (iPhone 14 Pro)
    mobileMaxWidth: '480px',    // 데스크탑에서도 이 폭으로 제한
    pagePaddingX: '26px',       // 페이지 좌우 패딩
    bottomNavHeight: '88px',    // 하단 네비 공간 (padding-bottom 용)
  },

  // 배경 그라데이션 (GlobalStyle과 동일)
  gradient: 'linear-gradient(63deg, #D6EDE5 26%, #CEECC4 56%, #ACDAC1 86%)',
};

export default theme;
