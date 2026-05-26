import { useState } from 'react';
import styled from 'styled-components';

import MobileLayout from '../components/common/MobileLayout';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';

import ConfirmDialog from '../components/common/ConfirmDialog';

import MembershipBadge from '../components/mypage/MembershipBadge';
import InfoRow from '../components/mypage/InfoRow';
import EditChip from '../components/mypage/EditChip';
import BudgetCard from '../components/mypage/BudgetCard';

// 더미 사용자 — API 연동 전까지 사용.
// 백엔드 응답 형태가 정해지면 user.provider === 'KAKAO' 같은 키로 분기 예정.
const USERS = {
  normal: {
    type: 'normal',
    name: '김상우',
    username: 'dev_Sangwoo',
    phone: '010-0000-000',
    email: 'user@example.com',
    nickname: '멋쟁이사자',
    gender: '남성',
    ageGroup: '20대',
    budget: 500000,
  },
  kakao: {
    type: 'kakao',
    name: '김상우',
    username: 'kakao_123456',
    phone: '010-0000-000',
    email: 'user@example.com',
    nickname: '멋쟁이사자',
    gender: '남성',
    ageGroup: '20대',
    budget: 500000,
  },
};

function MyPage() {
  // TODO(API): 실제 인증 사용자로 교체. 지금은 토글로 두 모드 확인용.
  const [userType, setUserType] = useState('normal');
  const user = USERS[userType];
  const isKakao = user.type === 'kakao';

  // 다이얼로그 오픈 상태
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // 임시 핸들러 — 추후 API 연동/페이지 이동으로 교체
  const handleEdit = (field) => console.log('[mypage] edit', field);
  const handleEditBudget = () => console.log('[mypage] edit budget');
  const handleLogoutConfirm = () => console.log('[mypage] logout confirmed');
  const handleWithdrawConfirm = () => console.log('[mypage] withdraw confirmed');

  return (
    <MobileLayout>
      <Header title="마이페이지" />

      <Body>
        {/* TODO: API 연동 시 제거 — 개발용 모드 토글 */}
        <DevToggle>
          <DevCaption>🛠 개발용 모드</DevCaption>
          <DevButtons>
            <DevBtn
              $active={userType === 'normal'}
              onClick={() => setUserType('normal')}
            >
              일반
            </DevBtn>
            <DevBtn
              $active={userType === 'kakao'}
              onClick={() => setUserType('kakao')}
            >
              카카오
            </DevBtn>
          </DevButtons>
        </DevToggle>

        {/* 프로필 + 정보 카드 */}
        <ProfileCard>
          <ProfileHead>
            <Avatar $type={user.type} />
            <UserName>{user.name}</UserName>
            <MembershipBadge type={user.type} />
          </ProfileHead>

          <Divider />

          <InfoList>
            <InfoRow
              label="아이디"
              value={user.username}
              action={isKakao ? <EditChip variant="disabled" /> : undefined}
            />
            <InfoRow
              label="비밀번호"
              value={isKakao ? '소셜 로그인' : undefined}
              action={
                isKakao ? (
                  <EditChip variant="disabled" />
                ) : (
                  <EditChip variant="edit" onClick={() => handleEdit('password')} />
                )
              }
            />
            <InfoRow label="전화번호" value={user.phone} />
            <InfoRow label="이메일" value={user.email} />
            <InfoRow
              label="별명"
              value={user.nickname}
              action={<EditChip variant="edit" onClick={() => handleEdit('nickname')} />}
            />
            <InfoRow label="성별" value={user.gender} />
            <InfoRow label="연령대" value={user.ageGroup} />
          </InfoList>
        </ProfileCard>

        {/* 예산 */}
        <BudgetCard amount={user.budget} onEdit={handleEditBudget} />

        {/* 로그아웃 + 회원 탈퇴 */}
        <LogoutCard type="button" onClick={() => setLogoutOpen(true)}>
          로그아웃
        </LogoutCard>
        <WithdrawText type="button" onClick={() => setWithdrawOpen(true)}>
          회원 탈퇴
        </WithdrawText>
      </Body>

      <BottomNav />

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="로그아웃 하시겠어요?"
        description={'다시 로그인하면 돌아올 수 있어요.'}
        confirmLabel="로그아웃"
        confirmVariant="primary"
        onConfirm={handleLogoutConfirm}
      />

      <ConfirmDialog
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        title="정말 탈퇴하시겠어요?"
        description={'탈퇴하면 그동안의 소비 기록과\n만족도 데이터가 모두 사라져요.'}
        confirmLabel="탈퇴하기"
        confirmVariant="danger"
        onConfirm={handleWithdrawConfirm}
      />
    </MobileLayout>
  );
}

export default MyPage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 16px;
`;

/* ===== 개발용 토글 ===== */

const DevToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px dashed rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

const DevCaption = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DevButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const DevBtn = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 4px 12px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.text.brand : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.text.secondary};
`;

/* ===== 프로필 ===== */

const ProfileCard = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 28px 24px 20px;
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ProfileHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.circle};
  background: ${({ theme, $type }) =>
    $type === 'kakao' ? theme.colors.accent.yellow : theme.colors.mint.dark};
`;

const UserName = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.ink};
`;

const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 2px 4px 4px;
`;

/* ===== 로그아웃 / 탈퇴 ===== */

const LogoutCard = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.ink};
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
  }
`;

const WithdrawText = styled.button`
  align-self: center;
  background: none;
  border: none;
  padding: 4px 10px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.brand};
  }
`;
