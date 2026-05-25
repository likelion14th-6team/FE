import styled from 'styled-components';
import Mochi from '../common/Mochi';

/**
 * 데이터 없을 때 안내 화면. 큰 모찌 + 텍스트 메시지.
 *
 * <EmptyState
 *   expression="sleeping"
 *   title="아직 기록된 소비가 없어요"
 *   description="첫 소비를 등록해보세요"
 * />
 *
 * props:
 *  - expression: 모찌 표정 (기본 sleeping)
 *  - title:      메인 메시지
 *  - description: 보조 메시지 (옵션)
 */
function EmptyState({ expression = 'sleeping', title, description }) {
  return (
    <Wrapper>
      <Mochi expression={expression} size="xl" />
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}

export default EmptyState;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 48px 24px;
  text-align: center;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.ink};
  margin: 0;
  margin-top: 4px;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;
