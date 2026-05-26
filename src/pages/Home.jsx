import { useMemo, useState } from "react";
import styled from "styled-components";
import MobileLayout from "../components/common/MobileLayout";
import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";
import FabButton from "../components/common/FabButton";
import MonthlySummaryCard from "../components/main/MonthlySummaryCard";
import CalendarCard from "../components/main/CalendarCard";
import DailyExpenseList from "../components/main/DailyExpenseList";
import { MOCK_EXPENSES } from "../data/mockExpenses";
import { isSameDay } from "../utils/calendarUtils";

function Home() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(today);

  const selectedKey = selectedDate.toISOString().slice(0, 10);

  const dayExpenses = useMemo(
    () => MOCK_EXPENSES.filter((e) => isSameDay(e.date, selectedKey)),
    [selectedKey],
  );

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

  return (
    <MobileLayout>
      <Header title="메인" />
      <Body>
        <MonthlySummaryCard
          userName="박재영"
          monthLabel={`${year}년 ${month}월`}
          budget={1000000}
          spent={420000}
        />
        <CalendarCard
          year={year}
          month={month}
          selectedKey={selectedKey}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <DailyExpenseList dateKey={selectedKey} items={dayExpenses} />
      </Body>
      <FabButton />
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
