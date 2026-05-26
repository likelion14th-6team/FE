import styled from "styled-components";

/**
 * 마이페이지 정보 한 행. "라벨 ──── 값 [액션?]" 형태.
 *
 * <InfoRow label="아이디" value="dev_Sangwoo" />
 * <InfoRow label="비밀번호" action={<EditChip variant="edit" />} />
 * <InfoRow label="별명" value="멋쟁이사자" action={<EditChip variant="edit" />} />
 * <InfoRow
 *   label="아이디"
 *   value="kakao_123456"
 *   action={<EditChip variant="disabled" />}
 * />
 *
 * props:
 *  - label:  좌측 라벨 (필수)
 *  - value:  우측 값 텍스트 (옵션 — 없어도 됨, 액션만 보여줄 수도)
 *  - action: 우측 끝 칩/버튼 (옵션)
 */
function InfoRow({ label, value, action }) {
  return (
    <Row>
      <Label>{label}</Label>
      <Right>
        {value && <Value>{value}</Value>}
        {action}
      </Right>
    </Row>
  );
}

export default InfoRow;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 28px;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.brand};
  font-weight: 500;
  flex-shrink: 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.ink};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
