import { useState } from 'react';
import styled from 'styled-components';
import MobileLayout from '../components/common/MobileLayout';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import Mochi from '../components/common/Mochi';

const CATEGORIES = [
  { label: '식비', pct: 40, color: '#F4A97F' },
  { label: '교통', pct: 25, color: '#7BB8D4' },
  { label: '쇼핑', pct: 20, color: '#C49BD4' },
  { label: '문화', pct: 15, color: '#F0C96A' },
];

const SATISFACTION_ROWS = [
  { label: '식비', pct: 60, color: '#F4A97F' },
  { label: '문화', pct: 60, color: '#7BB8D4' },
  { label: '쇼핑', pct: 60, color: '#C49BD4' },
  { label: '기타', pct: 60, color: '#B0B8B4' },
];

const TIME_BARS = [
  { label: '오전', h: 22 },
  { label: '오후', h: 30 },
  { label: '밤', h: 48 },
  { label: '새벽', h: 56 },
];

function Report() {
  const [monthLabel] = useState('2026년 4월');
  const budget = 1000000;
  const spent = 842300;
  const ratio = Math.round((spent / budget) * 100);

  return (
    <MobileLayout>
      <Header title="월간 후회 리포트" />

      <Body>
        <MonthPicker>
          <PickerBtn type="button" aria-label="이전 달">‹</PickerBtn>
          <span>{monthLabel}</span>
          <PickerBtn type="button" aria-label="다음 달">›</PickerBtn>
        </MonthPicker>

        <Card as="section">
          <CardPad>
            <Muted>총 예산 ₩ 1,000,000 중 이번 달 소비 총액</Muted>
            <BigAmount>₩ {spent.toLocaleString('ko-KR')}</BigAmount>
            <ProgressBar ratio={ratio} />
          </CardPad>
        </Card>

        <Card as="section">
          <CardPad>
            <SectionTitle>카테고리별 소비</SectionTitle>
            <CategoryRow>
              <Donut aria-hidden>◐</Donut>
              <Legend>
                {CATEGORIES.map((c) => (
                  <LegendItem key={c.label}>
                    <Dot $color={c.color} />
                    {c.label} {c.pct}%
                  </LegendItem>
                ))}
              </Legend>
            </CategoryRow>
          </CardPad>
        </Card>

        <Card as="section">
          <CardPad>
            <SectionTitle>전월 대비 증감</SectionTitle>
            <BarCompare>
              <Bar $h={38} $muted />
              <Bar $h={54} />
            </BarCompare>
            <BarLabels>
              <span>3월</span>
              <span>4월</span>
            </BarLabels>
          </CardPad>
        </Card>

        <Card as="section">
          <CardPad>
            <SectionTitle>시간대별 만족도</SectionTitle>
            <TimeChart>
              {TIME_BARS.map((t) => (
                <TimeCol key={t.label}>
                  <TimeBar $h={t.h} />
                  <TimeLabel>{t.label}</TimeLabel>
                </TimeCol>
              ))}
            </TimeChart>
          </CardPad>
        </Card>

        <Card as="section">
          <CardPad>
            <SectionTitle>카테고리별 만족도</SectionTitle>
            <SatList>
              {SATISFACTION_ROWS.map((row) => (
                <SatRow key={row.label}>
                  <SatName>{row.label}</SatName>
                  <SatTrack>
                    <SatFill $pct={row.pct} $color={row.color} />
                  </SatTrack>
                  <SatPct>{row.pct}%</SatPct>
                </SatRow>
              ))}
            </SatList>
          </CardPad>
        </Card>

        <AiCard>
          <AiTitle>AI 한줄평</AiTitle>
          <AiText>
            새벽 충동 쇼핑이 후회로 이어졌어요.
            <br />
            식비는 만족도가 꾸준히 높네요!
          </AiText>
        </AiCard>

        <Card as="section">
          <TipRow>
            <Mochi expression="report" />
            <TipText>
              <SectionTitle>다음 달에는 이렇게 해 보세요!</SectionTitle>
              <TipList>
                <li>새벽 쇼핑 알림 설정</li>
                <li>식비 예산 -20% 조정</li>
              </TipList>
            </TipText>
          </TipRow>
        </Card>
      </Body>

      <BottomNav />
    </MobileLayout>
  );
}

export default Report;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 16px;
`;

const MonthPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  height: 44px;
  background: ${({ theme }) => theme.colors.whiteAlpha60};
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`;

const PickerBtn = styled.button`
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.ink};
`;

const CardPad = styled.div`
  padding: 16px 20px;
`;

const Muted = styled.p`
  margin: 0 0 4px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.gray};
`;

const BigAmount = styled.p`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 800;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Donut = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: conic-gradient(
    #f4a97f 0 40%,
    #7bb8d4 40% 65%,
    #c49bd4 65% 85%,
    #f0c96a 85% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: transparent;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const BarCompare = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 17px;
  height: 54px;
`;

const Bar = styled.div`
  width: 142px;
  height: ${({ $h }) => $h}px;
  border-radius: 8px;
  background: ${({ theme, $muted }) =>
    $muted ? theme.colors.mint.light : theme.colors.nav.fill};
  box-shadow: ${({ $muted }) => ($muted ? 'none' : '0 0 2px rgba(206,236,196,0.6)')};
`;

const BarLabels = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text.gray};
`;

const TimeChart = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-end;
`;

const TimeCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const TimeBar = styled.div`
  width: 100%;
  height: ${({ $h }) => $h}px;
  border-radius: 4px;
  background: ${({ theme, $h }) => {
    if ($h >= 56) return theme.colors.nav.fill;
    if ($h >= 48) return theme.colors.mint.dark;
    if ($h >= 30) return theme.colors.mint.mid;
    return theme.colors.mint.light;
  }};
`;

const TimeLabel = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text.gray};
`;

const SatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SatName = styled.span`
  width: 36px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-shrink: 0;
`;

const SatTrack = styled.div`
  flex: 1;
  height: 10px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.progress.track};
  overflow: hidden;
`;

const SatFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 100px;
`;

const SatPct = styled.span`
  width: 36px;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.gray};
`;

const AiCard = styled.div`
  background: ${({ theme }) => theme.colors.accent.pointBox};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 16px 20px;
`;

const AiTitle = styled.h3`
  margin: 0 0 12px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.accent.yellowDark};
`;

const AiText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

const TipRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  align-items: flex-start;
`;

const TipText = styled.div`
  flex: 1;

  ${SectionTitle} {
    margin-bottom: 12px;
  }
`;

const TipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.gray};
`;
