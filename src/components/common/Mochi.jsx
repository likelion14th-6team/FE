import styled from 'styled-components';
import { MOCHI_IMAGES } from '../../constants/mochiImages';
import { MOCHI_SIZES } from '../../constants/mochiSizes';

/**
 * Figma 디자인 캐릭터(모찌)
 *
 * <Mochi expression="main" />       — 메인 요약 카드
 * <Mochi expression="report" />     — 리포트 하단 팁
 * <Mochi expression="happy_wave" size="xl" />
 */
function Mochi({ expression = 'smile', size = 'md', className }) {
  const src = MOCHI_IMAGES[expression] ?? MOCHI_IMAGES.default;
  const dims = MOCHI_SIZES[expression] ?? MOCHI_SIZES[size] ?? MOCHI_SIZES.md;

  return (
    <Wrap
      className={className}
      $w={dims.width}
      $h={dims.height}
      role="img"
      aria-label={`모찌 - ${expression}`}
    >
      <Img src={src} alt="" />
    </Wrap>
  );
}

export default Mochi;

const Wrap = styled.div`
  width: ${({ $w }) => `${$w}px`};
  height: ${({ $h }) => `${$h}px`};
  flex-shrink: 0;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  pointer-events: none;
  user-select: none;
  display: block;
`;
