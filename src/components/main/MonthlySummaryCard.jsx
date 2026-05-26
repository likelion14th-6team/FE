import styled from "styled-components";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import Mochi from "../common/Mochi";

function MonthlySummaryCard({
  userName = "박재영",
  monthLabel = "2026년 5월",
  budget = 1000000,
  spent = 420000,
}) {
  const remaining = budget - spent;
  const ratio = budget > 0 ? Math.round((spent / budget) * 100) : 0;

  const fmt = (n) => {
    if (n >= 10000) return `${Math.round(n / 10000)}만원`;
    return `${n.toLocaleString("ko-KR")}원`;
  };

  return (
    <Card as="section">
      <Inner>
        <TopRow>
          <Greeting>안녕하세요, {userName}님!</Greeting>
          <Month>{monthLabel}</Month>
        </TopRow>
        <ContentRow>
          <MochiWrap>
            <Mochi expression="main" />
          </MochiWrap>
          <Stats>
            <Stat>
              <StatLabel>예산</StatLabel>
              <StatValue>{fmt(budget)}</StatValue>
            </Stat>
            <Stat>
              <StatLabel>사용</StatLabel>
              <StatValue>{fmt(spent)}</StatValue>
            </Stat>
            <Stat>
              <StatLabel>남은 금액</StatLabel>
              <StatValue>{fmt(remaining)}</StatValue>
            </Stat>
          </Stats>
        </ContentRow>
        <ProgressBar ratio={ratio} label={`${ratio}% 사용`} />
      </Inner>
    </Card>
  );
}

export default MonthlySummaryCard;

const Inner = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
`;

const Greeting = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.ink};
`;

const Month = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.ink};
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MochiWrap = styled.div`
  flex-shrink: 0;
`;

const Stats = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.brand2};
`;

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.ink};
  white-space: nowrap;
`;
