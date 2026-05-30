import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatShortDateLabel } from "../../utils/calendarUtils";

function DailyExpenseList({
  dateKey,
  items = [],
  isLoading,
  isError,
  onDelete,
  isDeleting,
}) {
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

        {isLoading && <StatusText>불러오는 중...</StatusText>}
        {isError && !isLoading && (
          <StatusText>내역을 불러오지 못했어요</StatusText>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <Empty>이 날짜에 기록된 소비가 없어요</Empty>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <List>
            {items.map((item) => (
              <Row key={item.id}>
                <Left>
                  <Bar $color={item.categoryColor} />
                  <Meta>
                    <Name>{item.title}</Name>
                    <Sub>{item.categoryName}</Sub>
                  </Meta>
                </Left>
                <Right>
                  <Amount>{formatCurrency(item.amount)}</Amount>
                  {onDelete && (
                    <DeleteBtn
                      type="button"
                      aria-label="삭제"
                      disabled={isDeleting}
                      onClick={() => onDelete(item.id)}
                    >
                      ×
                    </DeleteBtn>
                  )}
                </Right>
              </Row>
            ))}
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

const StatusText = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
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
  flex: 1;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
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
`;

const DeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  font-family: inherit;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 12px 0;
`;
