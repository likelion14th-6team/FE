import styled from 'styled-components';

function ProgressBar({ ratio = 0, label }) {
  const pct = Math.min(100, Math.max(0, ratio));

  return (
    <Wrap>
      <Track>
        <Fill $pct={pct} />
      </Track>
      {label && <Label>{label}</Label>}
    </Wrap>
  );
}

export default ProgressBar;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Track = styled.div`
  width: 100%;
  height: 14px;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.progress.track};
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: 40px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.progress.fillStart} 0%,
    ${({ theme }) => theme.colors.progress.fillEnd} 100%
  );
  transition: width 0.25s ease;
`;

const Label = styled.span`
  align-self: flex-end;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.gray};
`;
