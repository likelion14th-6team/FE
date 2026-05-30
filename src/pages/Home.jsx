import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MobileLayout from "../components/common/MobileLayout";
import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";
import FabButton from "../components/common/FabButton";
import MonthlySummaryCard from "../components/main/MonthlySummaryCard";
import CalendarCard from "../components/main/CalendarCard";
import DailyExpenseList from "../components/main/DailyExpenseList";
import { useMe } from "../hooks/useMe";
import { useBudgets } from "../hooks/useBudgets";
import { useCategories } from "../hooks/useCategories";
import { useReportSummary } from "../hooks/useReports";
import {
  useDailyTransactions,
  useDeleteTransaction,
  useTransactionCalendar,
} from "../hooks/useTransactions";
import { buildCategoryColorLookup } from "../utils/categoryColor";
import { toDateKey, toTargetMonth } from "../utils/dateKey";
import { mapDailyTransaction } from "../utils/transactionMappers";
import { getApiErrorMessage } from "../utils/apiError";

function Home() {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(today);

  const selectedKey = toDateKey(selectedDate);
  const targetMonth = toTargetMonth(year, month);

  const { data: me } = useMe();
  const { data: budgetData } = useBudgets(targetMonth);
  const { data: summary } = useReportSummary(targetMonth);
  const { data: calendarData } = useTransactionCalendar(year, month);
  const { data: categories = [] } = useCategories("EXPENSE");
  const categoryLookup = useMemo(
    () => buildCategoryColorLookup(categories),
    [categories],
  );
  const {
    data: dailyData,
    isLoading: dailyLoading,
    isError: dailyError,
  } = useDailyTransactions(selectedKey);
  const deleteTx = useDeleteTransaction();

  const displayName = me?.nickname || me?.name || "회원";

  const budgetAmount = summary?.targetAmount ?? budgetData?.targetAmount ?? 0;
  const spentAmount =
    summary?.totalExpense ?? calendarData?.monthlyTotalExpense ?? 0;

  const dayTotals = useMemo(() => {
    const map = {};
    (calendarData?.days ?? []).forEach((d) => {
      map[d.date] = {
        totalExpense: d.totalExpense,
        totalIncome: d.totalIncome,
      };
    });
    return map;
  }, [calendarData?.days]);

  const dayExpenses = useMemo(() => {
    const txs = dailyData?.transactions ?? [];
    return txs
      .filter((t) => t.type === "EXPENSE")
      .map((tx) => mapDailyTransaction(tx, categoryLookup));
  }, [dailyData?.transactions, categoryLookup]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else setMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else setMonth((m) => m + 1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("이 내역을 삭제할까요?")) return;
    try {
      await deleteTx.mutateAsync(id);
    } catch (err) {
      alert(getApiErrorMessage(err, "삭제에 실패했습니다."));
    }
  };

  return (
    <MobileLayout>
      <Header title="메인" />
      <Body>
        <MonthlySummaryCard
          userName={displayName}
          monthLabel={`${year}년 ${month}월`}
          budget={budgetAmount}
          spent={spentAmount}
        />
        <CalendarCard
          year={year}
          month={month}
          selectedKey={selectedKey}
          dayTotals={dayTotals}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <DailyExpenseList
          dateKey={selectedKey}
          items={dayExpenses}
          isLoading={dailyLoading}
          isError={dailyError}
          onDelete={handleDelete}
          isDeleting={deleteTx.isPending}
        />
      </Body>
      <FabButton
        onClick={() =>
          navigate("/register", { state: { date: selectedKey } })
        }
      />
      <BottomNav />
    </MobileLayout>
  );
}

export default Home;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
`;
