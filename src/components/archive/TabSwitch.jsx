import styled from "styled-components";

/**
 * 두 탭 스위치 (전체 / 후회 소비).
 * 컨테이너는 반투명 흰 배경, 활성 탭만 진한 흰 + 그림자.
 *
 * <TabSwitch
 *   value="all"
 *   onChange={setTab}
 *   tabs={[
 *     { value: 'all',    label: '전체' },
 *     { value: 'regret', label: '후회 소비', activeColor: '#FF8B8B' },
 *   ]}
 * />
 *
 * props:
 *  - value:    현재 활성 탭의 value
 *  - onChange: (newValue) => void
 *  - tabs:     [{ value, label, activeColor? }]
 *              activeColor를 주면 활성화 시 그 색 글자 (후회 탭 강조용)
 */
function TabSwitch({ value, onChange, tabs }) {
  return (
    <Container role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <Tab
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            $active={isActive}
            $activeColor={tab.activeColor}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </Tab>
        );
      })}
    </Container>
  );
}

export default TabSwitch;

const Container = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.whiteAlpha60};
  border-radius: ${({ theme }) => theme.radius.card};
`;

const Tab = styled.button`
  flex: 1;
  height: 50px;
  border: none;
  border-radius: ${({ $active }) => ($active ? "16px" : "12px")};
  cursor: pointer;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.white : "transparent"};
  color: ${({ theme, $active, $activeColor }) =>
    $active ? ($activeColor ?? theme.colors.text.ink) : theme.colors.text.ink};
  box-shadow: ${({ theme, $active }) =>
    $active ? theme.shadow.cardSoft : "none"};
  transition:
    background 0.15s,
    color 0.15s;
`;
