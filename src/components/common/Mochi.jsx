import styled from 'styled-components';

/**
 * 캐릭터 '모찌' (Placeholder 버전).
 * 진짜 이미지가 들어올 때까지 민트색 원 + 이모지로 대신함.
 *
 * 이미지 교체 시 (TODO):
 *   1. /public/characters/mochi-{expression}.png 8장 배치
 *   2. 아래 <Bubble> 자리를 <img src={`/characters/mochi-${expression}.png`} ... /> 로 교체
 *   3. EXPRESSION_EMOJI 객체 삭제
 *   → 사용처(<Mochi expression="..." />)는 그대로 둠.
 *
 * 사용 예:
 *   <Mochi expression="sleeping" size="xl" />
 *   <Mochi expression="happy_wave" />          // size 기본값 md
 */

const EXPRESSION_EMOJI = {
  happy_wave: '👋',
  smile: '🙂',
  neutral: '😐',
  excited: '🤩',
  rest: '😌',
  thinking: '🤔',
  sad: '😢',
  sleeping: '😴',
};

const SIZE_PX = {
  sm: 40,
  md: 60,
  lg: 80,
  xl: 120,
};

function Mochi({ expression = 'smile', size = 'md' }) {
  const emoji = EXPRESSION_EMOJI[expression] ?? EXPRESSION_EMOJI.smile;
  const px = SIZE_PX[size] ?? SIZE_PX.md;

  return (
    <Bubble $px={px} role="img" aria-label={`모찌 - ${expression}`}>
      <Emoji $px={px}>{emoji}</Emoji>
    </Bubble>
  );
}

export default Mochi;

const Bubble = styled.div`
  width: ${({ $px }) => `${$px}px`};
  height: ${({ $px }) => `${$px}px`};
  border-radius: ${({ theme }) => theme.radius.circle};
  background: ${({ theme }) => theme.colors.mint.dark};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
`;

const Emoji = styled.span`
  /* 이모지 크기는 컨테이너의 60%로 자동 스케일 */
  font-size: ${({ $px }) => `${Math.round($px * 0.6)}px`};
  line-height: 1;
`;
