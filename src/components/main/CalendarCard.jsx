import styled from 'styled-components';
import Card from '../common/Card';
import { buildMonthGrid, formatMonthLabel } from '../../utils/calendarUtils';

function CalendarCard({ year, month, selectedKey, onSelectDate, onPrevMonth, onNextMonth }) {
  const { weekdays, cells } = buildMonthGrid(year, month);

  return (
    <Card as="section">
      <Inner>
        <MonthNav>
          <NavBtn type="button" onClick={onPrevMonth} aria-label="이전 달">
            ‹
          </NavBtn>
          <MonthTitle>{formatMonthLabel(year, month)}</MonthTitle>
          <NavBtn type="button" onClick={onNextMonth} aria-label="다음 달">
            ›
          </NavBtn>
        </MonthNav>
        <Grid>
          <WeekRow>
            {weekdays.map((d, i) => (
              <Weekday key={d} $sunday={i === 0}>
                {d}
              </Weekday>
            ))}
          </WeekRow>
          {Array.from({ length: 6 }, (_, row) => (
            <WeekRow key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((cell) => {
                const selected = selectedKey === cell.key;
                return (
                  <DayCell key={cell.key}>
                    <DayBtn
                      type="button"
                      onClick={() => onSelectDate(cell.date)}
                      $inMonth={cell.inMonth}
                      $sunday={cell.isSunday}
                      $selected={selected}
                      aria-pressed={selected}
                    >
                      {cell.day}
                    </DayBtn>
                  </DayCell>
                );
              })}
            </WeekRow>
          ))}
        </Grid>
      </Inner>
    </Card>
  );
}

export default CalendarCard;

const Inner = styled.div`
  padding: 16px 20px;
`;

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const NavBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.ink};
  font-family: inherit;
`;

const MonthTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Weekday = styled.span`
  text-align: center;
  padding: 8px 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $sunday }) =>
    $sunday ? theme.colors.text.sunday : theme.colors.text.ink};
`;

const DayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
`;

const DayBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.nav.fill : 'transparent'};
  color: ${({ theme, $inMonth, $sunday, $selected }) => {
    if ($selected) return theme.colors.text.ink;
    if (!$inMonth) return theme.colors.text.gray;
    if ($sunday) return theme.colors.text.sunday;
    return theme.colors.text.ink;
  }};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.nav.fill : theme.colors.mint.light};
  }
`;
