import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import MobileLayout from "../components/common/MobileLayout";
import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";

import ConfirmDialog from "../components/common/ConfirmDialog";
import InputDialog from "../components/common/InputDialog";

import MembershipBadge from "../components/mypage/MembershipBadge";
import InfoRow from "../components/mypage/InfoRow";
import EditChip from "../components/mypage/EditChip";
import BudgetCard from "../components/mypage/BudgetCard";
import PasswordEditModal from "../components/mypage/PasswordEditModal";
import PhoneEditDialog from "../components/mypage/PhoneEditDialog";
import ProfileSelectDialog from "../components/mypage/ProfileSelectDialog";

import { useAuthState, useLogout } from "../hooks/useAuth";
import { useMe, usePatchMe } from "../hooks/useMe";
import { useBudgets, useUpsertBudget } from "../hooks/useBudgets";
import { getApiErrorMessage } from "../utils/apiError";
import { isMissingProfileField } from "../constants/profileEnums";
import {
  formatAgeGroup,
  formatGender,
  getCurrentTargetMonth,
  getMembershipType,
  isKakaoUser,
} from "../utils/userProfile";
import { parseBudget } from "../utils/formatBudget";

function MyPage() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { isAuthenticated } = useAuthState();
  const { data: me, isLoading, isError, error, refetch } = useMe();
  const { data: budgetData, isLoading: budgetLoading } = useBudgets();
  const patchMe = usePatchMe();
  const upsertBudget = useUpsertBudget();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [nicknameOpen, setNicknameOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [ageGroupOpen, setAgeGroupOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const membershipType = getMembershipType(me);
  const isKakao = isKakaoUser(me);
  const budgetAmount = budgetData?.targetAmount ?? 0;

  const handleSubmitPhone = async (phone) => {
    try {
      await patchMe.mutateAsync({ phone });
      alert("전화번호가 저장되었습니다.");
    } catch (err) {
      alert(
        "저장 실패: " + getApiErrorMessage(err, "전화번호 저장에 실패했습니다."),
      );
    }
  };

  const handleSubmitGender = async ({ gender }) => {
    try {
      await patchMe.mutateAsync({ gender });
      alert("성별이 저장되었습니다.");
    } catch (err) {
      alert(
        "저장 실패: " + getApiErrorMessage(err, "성별 저장에 실패했습니다."),
      );
    }
  };

  const handleSubmitAgeGroup = async ({ ageGroup }) => {
    try {
      await patchMe.mutateAsync({ ageGroup });
      alert("연령대가 저장되었습니다.");
    } catch (err) {
      alert(
        "저장 실패: " + getApiErrorMessage(err, "연령대 저장에 실패했습니다."),
      );
    }
  };

  const handleSubmitNickname = async (newNickname) => {
    const trimmed = newNickname.trim();
    try {
      await patchMe.mutateAsync({ nickname: trimmed });
      alert("별명이 수정되었습니다.");
    } catch (err) {
      alert(
        "수정 실패: " + getApiErrorMessage(err, "별명 수정에 실패했습니다."),
      );
    }
  };

  const handleSubmitBudget = async (newBudgetStr) => {
    const newBudget = parseBudget(newBudgetStr);
    if (!newBudget || newBudget <= 0) return;

    try {
      await upsertBudget.mutateAsync({
        targetMonth: getCurrentTargetMonth(),
        targetAmount: newBudget,
      });
      alert("예산이 수정되었습니다.");
    } catch (err) {
      alert(
        "수정 실패: " + getApiErrorMessage(err, "예산 수정에 실패했습니다."),
      );
    }
  };

  const handleSubmitPassword = async (current, next) => {
    try {
      await patchMe.mutateAsync({
        currentPassword: current,
        newPassword: next,
      });
      alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      alert(
        "변경 실패: " +
          getApiErrorMessage(err, "비밀번호 변경에 실패했습니다."),
      );
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/login");
  };

  const handleWithdrawConfirm = () => {
    // TODO(API): DELETE /users/me 등 탈퇴 API 연동
    logout();
    navigate("/signup");
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <MobileLayout>
        <Header title="마이페이지" />
        <StatusMessage>내 정보를 불러오는 중...</StatusMessage>
        <BottomNav />
      </MobileLayout>
    );
  }

  if (isError || !me) {
    return (
      <MobileLayout>
        <Header title="마이페이지" />
        <StatusMessage>
          {getApiErrorMessage(error, "내 정보를 불러오지 못했습니다.")}
          <RetryBtn type="button" onClick={() => refetch()}>
            다시 시도
          </RetryBtn>
        </StatusMessage>
        <BottomNav />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Header title="마이페이지" />

      <Body>
        <ProfileCard>
          <ProfileHead>
            <Avatar $type={membershipType} />
            <UserName>{me.name}</UserName>
            <MembershipBadge type={membershipType} />
          </ProfileHead>

          <Divider />

          <InfoList>
            <InfoRow
              label="아이디"
              value={me.username}
              action={isKakao ? <EditChip variant="disabled" /> : undefined}
            />
            <InfoRow
              label="비밀번호"
              value={isKakao ? "소셜 로그인" : "••••••••"}
              action={
                isKakao ? (
                  <EditChip variant="disabled" />
                ) : (
                  <EditChip
                    variant="edit"
                    onClick={() => setPasswordOpen(true)}
                  />
                )
              }
            />
            <InfoRow
              label="전화번호"
              value={me.phone || "-"}
              action={
                <EditChip
                  variant="edit"
                  label={isMissingProfileField(me.phone) ? "추가" : "수정"}
                  onClick={() => setPhoneOpen(true)}
                />
              }
            />
            <InfoRow label="이메일" value={me.email} />
            <InfoRow
              label="별명"
              value={me.nickname}
              action={
                <EditChip
                  variant="edit"
                  onClick={() => setNicknameOpen(true)}
                />
              }
            />
            <InfoRow
              label="성별"
              value={formatGender(me.gender)}
              action={
                <EditChip
                  variant="edit"
                  label={isMissingProfileField(me.gender) ? "추가" : "수정"}
                  onClick={() => setGenderOpen(true)}
                />
              }
            />
            <InfoRow
              label="연령대"
              value={formatAgeGroup(me.ageGroup)}
              action={
                <EditChip
                  variant="edit"
                  label={isMissingProfileField(me.ageGroup) ? "추가" : "수정"}
                  onClick={() => setAgeGroupOpen(true)}
                />
              }
            />
          </InfoList>
        </ProfileCard>

        <BudgetCard
          amount={budgetLoading ? 0 : budgetAmount}
          onEdit={() => setBudgetOpen(true)}
        />

        <LogoutCard type="button" onClick={() => setLogoutOpen(true)}>
          로그아웃
        </LogoutCard>
        <WithdrawText type="button" onClick={() => setWithdrawOpen(true)}>
          회원 탈퇴
        </WithdrawText>
      </Body>

      <BottomNav />

      <PhoneEditDialog
        open={phoneOpen}
        onClose={() => setPhoneOpen(false)}
        initialValue={me.phone || ""}
        title={isMissingProfileField(me.phone) ? "전화번호 등록" : "전화번호 수정"}
        description={
          isKakao && isMissingProfileField(me.phone)
            ? "카카오 로그인 시 전화번호는 제공되지 않아요. 원하시면 여기서 등록해 주세요."
            : undefined
        }
        onSubmit={handleSubmitPhone}
      />

      <ProfileSelectDialog
        open={genderOpen}
        onClose={() => setGenderOpen(false)}
        kind="gender"
        initialGenderApi={me.gender}
        onSubmit={handleSubmitGender}
      />

      <ProfileSelectDialog
        open={ageGroupOpen}
        onClose={() => setAgeGroupOpen(false)}
        kind="ageGroup"
        initialAgeGroupApi={me.ageGroup}
        onSubmit={handleSubmitAgeGroup}
      />

      <InputDialog
        open={nicknameOpen}
        onClose={() => setNicknameOpen(false)}
        title="별명 수정"
        label="새 별명"
        placeholder="재영"
        initialValue={me.nickname}
        onSubmit={handleSubmitNickname}
        validate={(v) => {
          const len = v.trim().length;
          if (len < 2) return "별명은 2자 이상 입력해주세요";
          if (len > 20) return "20자 이하로 입력해주세요";
          return null;
        }}
        confirmLabel="저장"
      />

      <InputDialog
        open={budgetOpen}
        onClose={() => setBudgetOpen(false)}
        title="이번 달 예산 수정"
        label="목표 예산"
        placeholder="500,000"
        initialValue={budgetAmount > 0 ? String(budgetAmount) : ""}
        inputType="text"
        inputMode="numeric"
        suffix="원"
        formatDisplay={(v) => {
          const num = parseBudget(v);
          return num > 0 ? num.toLocaleString() : "";
        }}
        onSubmit={handleSubmitBudget}
        validate={(v) => {
          const n = parseBudget(v);
          if (!n || n <= 0) return "0보다 큰 금액을 입력해주세요";
          if (n > 100000000) return "1억 이하로 입력해주세요";
          return null;
        }}
        confirmLabel="저장"
      />

      <PasswordEditModal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        onSubmit={handleSubmitPassword}
      />

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="로그아웃 하시겠어요?"
        description={"다시 로그인하면 돌아올 수 있어요."}
        confirmLabel="로그아웃"
        confirmVariant="primary"
        onConfirm={handleLogoutConfirm}
      />

      <ConfirmDialog
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        title="정말 탈퇴하시겠어요?"
        description={
          "탈퇴하면 그동안의 소비 기록과\n만족도 데이터가 모두 사라져요."
        }
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

const StatusMessage = styled.p`
  margin: 48px 16px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

const RetryBtn = styled.button`
  display: block;
  margin: 16px auto 0;
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.mint.dark};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
`;

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
    $type === "kakao" ? theme.colors.accent.yellow : theme.colors.mint.dark};
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

const LogoutCard = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
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
