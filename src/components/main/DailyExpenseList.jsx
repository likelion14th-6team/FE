import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../common/Card";
import { CATEGORIES } from "../../utils/constants";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatShortDateLabel } from "../../utils/calendarUtils";

function DailyExpenseList({ dateKey, items = [] }) {
  const navigate = useNavigate();
  const label = formatShortDateLabel(dateKey);

  return (
    <Card as="section">
      <Inner>
        <HeaderRow>
          <Title>{label} 소비 내역</Title>
          <ViewAll type="button" onClick={() => navigate("/archive")}>
            전체 보기 ›
          </ViewAll>
        </HeaderRow>
        {items.length === 0 ? (
          <Empty>이 날짜에 기록된 소비가 없어요</Empty>
        ) : (
          <List>
            {items.map((item) => {
              const cat = CATEGORIES[item.categoryKey] ?? CATEGORIES.etc;
              return (
                <Row key={item.id}>
                  <Left>
                    <Bar $color={cat.color} />
                    <Meta>
                      <Name>{item.title}</Name>
                      <Sub>{cat.label}</Sub>
                    </Meta>
                  </Left>
                  <Amount>{formatCurrency(item.amount)}</Amount>
                </Row>
              );
            })}
          </List>
        )}
      </Inner>
    </Card>
  );
}

export default DailyExpenseList;

const Inner = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
`;

const ViewAll = styled.button`
  border: none;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.brand};
  cursor: pointer;
  padding: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const Bar = styled.div`
  width: 6px;
  height: 32px;
  border-radius: 20px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

const Sub = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: rgba(0, 0, 0, 0.6);
`;

const Amount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  flex-shrink: 0;
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 12px 0;
`;
