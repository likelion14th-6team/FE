import styled from 'styled-components';

/**
 * 회원 유형 배지.
 *  - type="normal": "일반 회원" (민트)
 *  - type="kakao":  "카카오 가입" (노란)
 */
function MembershipBadge({ type = 'normal' }) {
  const label = type === 'kakao' ? '카카오 가입' : '일반 회원';
  return <Badge $type={type}>{label}</Badge>;
}

export default MembershipBadge;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  background: ${({ theme, $type }) =>
    $type === 'kakao' ? theme.colors.accent.yellow : theme.colors.mint.light};
  color: ${({ theme, $type }) =>
    $type === 'kakao'
      ? theme.colors.accent.yellowDark
      : theme.colors.text.brand};
`;
