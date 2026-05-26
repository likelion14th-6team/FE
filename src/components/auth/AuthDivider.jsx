import styled from 'styled-components';

function AuthDivider() {
  return (
    <Row>
      <Line />
      <Text>또는</Text>
      <Line />
    </Row>
  );
}

export default AuthDivider;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(107, 91, 12, 0.25);
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent.yellowDark};
  flex-shrink: 0;
`;
