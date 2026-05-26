import styled from 'styled-components';

/**
 * 만족도 별점 (읽기 전용).
 *
 * <StarRating value={4} />
 * <StarRating value={2} size="sm" />
 *
 * props:
 *  - value: 0~5 정수 (필수)
 *  - max:   별 개수 (기본 5)
 *  - size:  'sm' | 'md'  (기본 md)
 */
function StarRating({ value, max = 5, size = 'md', onChange }) {
  const interactive = typeof onChange === 'function';

  return (
    <Row aria-label={`만족도 ${value}점 / ${max}점`}>
      {Array.from({ length: max }, (_, i) => {
        const score = i + 1;
        const StarTag = interactive ? StarBtn : Star;
        return (
          <StarTag
            key={i}
            type={interactive ? 'button' : undefined}
            $active={i < value}
            $size={size}
            onClick={interactive ? () => onChange(score) : undefined}
            aria-label={interactive ? `${score}점` : undefined}
          >
            ★
          </StarTag>
        );
      })}
    </Row>
  );
}

export default StarRating;

const Row = styled.span`
  display: inline-flex;
  gap: 2px;
  line-height: 1;
`;

const SIZE_PX = { sm: 14, md: 18 };

const starStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1;
  padding: 0;
`;

const Star = styled.span`
  ${starStyles}
  font-size: ${({ $size }) => `${SIZE_PX[$size]}px`};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.star.active : theme.colors.star.inactive};
`;

const StarBtn = styled.button`
  ${starStyles}
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${({ $size }) => `${SIZE_PX[$size] ?? 18}px`};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.star.active : theme.colors.star.inactive};
`;
