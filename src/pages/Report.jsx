import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import MobileLayout from "../components/common/MobileLayout";
import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";
import Card from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";
import Mochi from "../components/common/Mochi";
import {
  getReportSummary,
  getReportCategories,
  getReportSatisfaction,
  getReportAi,
} from "../api/report";

// YYYY-MM → 이전/다음 달 계산
function shiftMonth(ym, delta) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// YYYY-MM → "YYYY년 M월"
function toLabel(ym) {
  const [y, m] = ym.split("-");
  return `${y}년 ${parseInt(m)}월`;
}

// averageSatisfaction(1~5) → 바 높이(px)
function satToH(sat) {
  return Math.round(8 + (sat / 5) * 48);
}

// 카테고리 배열 → conic-gradient 문자열
function buildGradient(categories) {
  if (!categories?.length) return "conic-gradient(#eee 0% 100%)";
  let acc = 0;
  const stops = categories.map((c) => {
    const start = acc;
    acc += c.percentage;
    return `${c.colorCode} ${start.toFixed(2)}% ${acc.toFixed(2)}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

// 비교 막대 높이 계산 (최대 54px)
function compareHeights(last, current) {
  const max = Math.max(last, current, 1);
  return {
    lastH: Math.round((last / max) * 54),
    currH: Math.round((current / max) * 54),
  };
}

function Report() {
  const [targetMonth, setTargetMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const monthLabel = toLabel(targetMonth);
  const prevLabel = toLabel(shiftMonth(targetMonth, -1));

  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ["report-summary", targetMonth],
    queryFn: () => getReportSummary(targetMonth),
  });

  const { data: categories, isLoading: loadingCat } = useQuery({
    queryKey: ["report-categories", targetMonth],
    queryFn: () => getReportCategories(targetMonth, "EXPENSE"),
  });

  const { data: timeSat } = useQuery({
    queryKey: ["report-satisfaction-time", targetMonth],
    queryFn: () => getReportSatisfaction(targetMonth, "TIME_PERIOD"),
  });

  const { data: catSat } = useQuery({
    queryKey: ["report-satisfaction-cat", targetMonth],
    queryFn: () => getReportSatisfaction(targetMonth, "CATEGORY"),
  });

  const { data: ai, isLoading: loadingAi } = useQuery({
    queryKey: ["report-ai", targetMonth],
    queryFn: () => getReportAi(targetMonth),
  });

  // 예산 요약
  const spent = summary?.totalExpense ?? 0;
  const budget = summary?.targetAmount ?? 0;
  const ratio = budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;
  const lastMonthExpense = summary?.comparedToLastMonth?.lastMonthExpense ?? 0;
  const { lastH, currH } = compareHeights(lastMonthExpense, spent);

  // 카테고리 도넛
  const catList = categories?.categories ?? [];
  const gradient = buildGradient(catList);

  // 시간대 만족도 바
  const timeGroups = timeSat?.groups ?? [];

  // 카테고리별 만족도
  const catSatGroups = catSat?.groups ?? [];

  return (
    <MobileLayout>
      <Header title="월간 후회 리포트" />

      <Body>
        <MonthPicker>
          <PickerBtn
            type="button"
            aria-label="이전 달"
            onClick={() => setTargetMonth((m) => shiftMonth(m, -1))}
          >
            <ChevronLeft size={20} />
          </PickerBtn>
          <span>{monthLabel}</span>
          <PickerBtn
            type="button"
            aria-label="다음 달"
            onClick={() => setTargetMonth((m) => shiftMonth(m, 1))}
          >
            <ChevronRight size={20} />
          </PickerBtn>
        </MonthPicker>

        {/* 예산 요약 */}
        <Card as="section">
          <CardPad>
            {loadingSummary ? (
              <Skeleton />
            ) : summary ? (
              <>
                <Muted>총 예산 ₩ {budget.toLocaleString("ko-KR")} 중 이번 달 소비 총액</Muted>
                <BigAmount>₩ {spent.toLocaleString("ko-KR")}</BigAmount>
                <ProgressBar ratio={ratio} />
                {summary.comparedToLastMonth && (
                  <CompareText $down={summary.comparedToLastMonth.difference < 0}>
                    전월 대비{" "}
                    {summary.comparedToLastMonth.difference < 0 ? "▼" : "▲"}{" "}
                    ₩ {Math.abs(summary.comparedToLastMonth.difference).toLocaleString("ko-KR")} (
                    {Math.abs(summary.comparedToLastMonth.differencePercentage).toFixed(1)}%)
                  </CompareText>
                )}
              </>
            ) : (
              <EmptyMsg>이번 달 예산이 설정되지 않았어요.</EmptyMsg>
            )}
          </CardPad>
        </Card>

        {/* 카테고리별 소비 */}
        <Card as="section">
          <CardPad>
            <SectionTitle>카테고리별 소비</SectionTitle>
            {loadingCat ? (
              <Skeleton />
            ) : catList.length > 0 ? (
              <CategoryRow>
                <Donut $gradient={gradient} />
                <Legend>
                  {catList.map((c) => (
                    <LegendItem key={c.categoryId}>
                      <Dot $color={c.colorCode} />
                      {c.categoryName} {c.percentage.toFixed(1)}%
                    </LegendItem>
                  ))}
                </Legend>
              </CategoryRow>
            ) : (
              <EmptyMsg>지출 내역이 없어요.</EmptyMsg>
            )}
          </CardPad>
        </Card>

        {/* 전월 대비 증감 */}
        <Card as="section">
          <CardPad>
            <SectionTitle>전월 대비 증감</SectionTitle>
            <BarCompare>
              <Bar $h={lastH || 4} $muted />
              <Bar $h={currH || 4} />
            </BarCompare>
            <BarLabels>
              <span>{prevLabel}</span>
              <span>{monthLabel}</span>
            </BarLabels>
          </CardPad>
        </Card>

        {/* 시간대별 만족도 */}
        <Card as="section">
          <CardPad>
            <SectionTitle>시간대별 만족도</SectionTitle>
            {timeGroups.length > 0 ? (
              <TimeChart>
                {timeGroups.map((g) => (
                  <TimeCol key={g.key}>
                    <TimeBar $h={satToH(g.averageSatisfaction)} />
                    <TimeLabel>{g.label.split(" ")[0]}</TimeLabel>
                  </TimeCol>
                ))}
              </TimeChart>
            ) : (
              <EmptyMsg>만족도 데이터가 없어요.</EmptyMsg>
            )}
          </CardPad>
        </Card>

        {/* 카테고리별 만족도 */}
        <Card as="section">
          <CardPad>
            <SectionTitle>카테고리별 만족도</SectionTitle>
            {catSatGroups.length > 0 ? (
              <SatList>
                {catSatGroups.map((g) => (
                  <SatRow key={g.key}>
                    <SatName>{g.label}</SatName>
                    <SatTrack>
                      <SatFill
                        $pct={Math.round((g.averageSatisfaction / 5) * 100)}
                        $color={g.colorCode ?? "#7BB8D4"}
                      />
                    </SatTrack>
                    <SatPct>{g.averageSatisfaction.toFixed(1)}</SatPct>
                  </SatRow>
                ))}
              </SatList>
            ) : (
              <EmptyMsg>만족도 데이터가 없어요.</EmptyMsg>
            )}
          </CardPad>
        </Card>

        {/* AI 한줄평 */}
        <AiCard>
          <AiTitle>AI 한줄평</AiTitle>
          {loadingAi ? (
            <Skeleton />
          ) : ai ? (
            <AiText>{ai.aiComment}</AiText>
          ) : (
            <AiText>AI 한줄평을 불러올 수 없어요.</AiText>
          )}
        </AiCard>

        {/* 다음 달 제안 */}
        <Card as="section">
          <TipRow>
            <Mochi expression="report" />
            <TipText>
              <SectionTitle>다음 달에는 이렇게 해 보세요!</SectionTitle>
              {ai?.actionSuggestion ? (
                <TipBody>{ai.actionSuggestion}</TipBody>
              ) : (
                <TipBody>제안 내용을 불러오는 중이에요.</TipBody>
              )}
            </TipText>
          </TipRow>
        </Card>
      </Body>

      <BottomNav />
    </MobileLayout>
  );
}

export default Report;

/* ── Styled Components ─────────────────────────────────────── */

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  font-weight: 500;
  margin-bottom: 8px;
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

const CompareText = styled.p`
  margin: 8px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ $down, theme }) =>
    $down ? theme.colors.text.brand : theme.colors.text.gray};
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Donut = styled.div`
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: ${({ $gradient }) => $gradient};
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
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
  flex-shrink: 0;
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
  box-shadow: ${({ $muted }) =>
    $muted ? "none" : "0 0 2px rgba(206,236,196,0.6)"};
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
  gap: 12px;
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
    if ($h >= 50) return theme.colors.nav.fill;
    if ($h >= 38) return theme.colors.mint.dark;
    if ($h >= 26) return theme.colors.mint.mid;
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
  font-weight: 500;
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

const TipBody = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.gray};
  line-height: 1.6;
`;

const EmptyMsg = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.gray};
`;

const Skeleton = styled.div`
  height: 20px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
