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
function StarRating({ value, max = 5, size = 'md' }) {
  return (
    <Row aria-label={`만족도 ${value}점 / ${max}점`}>
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} $active={i < value} $size={size}>
          ★
        </Star>
      ))}
    </Row>
  );
}

export default StarRating;

const Row = styled.span`
  display: inline-flex;
  gap: 1px;
  line-height: 1;
`;

const SIZE_PX = { sm: 10, md: 13 };

const Star = styled.span`
  font-size: ${({ $size }) => `${SIZE_PX[$size]}px`};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.star.active : theme.colors.star.inactive};
  line-height: 1;
`;
