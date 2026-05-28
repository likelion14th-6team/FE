import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MobileLayout from '../components/common/MobileLayout';
import Button from '../components/common/Button';
import Mochi from '../components/common/Mochi';
import AuthField from '../components/auth/AuthField';
import Header from '../components/common/Header';
import { useSignup, useLogin } from '../hooks/useAuth';
import { useCreateBudget } from '../hooks/useBudgets';

const AGE_OPTIONS = ['10대', '20대', '30대', '40대', '50대+'];

// 폼 값 → 백엔드 enum 매핑
const GENDER_MAP = { male: 'MALE', female: 'FEMALE' };
const AGE_MAP = {
  '10대': '10s',
  '20대': '20s',
  '30대': '30s',
  '40대': '40s',
  '50대+': '50s',
};

function Signup() {
  const navigate = useNavigate();
  const signup = useSignup();
  const login = useLogin();
  const createBudget = useCreateBudget();
  const isPending = signup.isPending || login.isPending || createBudget.isPending;

  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    email: '',
    nickname: '',
    gender: 'male',
    ageGroup: '20대',
    budget: '',
    terms: false,
    privacy: false,
    marketing: false,
  });

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!form.terms || !form.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    try {
      // 1) 회원가입
      await signup.mutateAsync({
        username: form.username,
        password: form.password,
        name: form.name,
        nickname: form.nickname,
        email: form.email,
        phone: form.phone || undefined,
        gender: GENDER_MAP[form.gender],
        ageGroup: AGE_MAP[form.ageGroup],
      });

      // 2) 자동 로그인 (예산 생성 시 토큰 필요)
      await login.mutateAsync({
        username: form.username,
        password: form.password,
      });

      // 3) 입력한 월 예산이 있으면 이번 달 예산으로 생성
      const budgetAmount = Number(String(form.budget).replace(/[^0-9]/g, ''));
      if (budgetAmount > 0) {
        const now = new Date();
        const targetMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        await createBudget.mutateAsync({
          targetMonth,
          targetAmount: budgetAmount,
        });
      }

      navigate('/');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        '가입에 실패했습니다. 다시 시도해주세요.';
      alert('가입 실패: ' + msg);
    }
  };

  return (
    <MobileLayout $hasBottomNav={false}>
      <Header align="left" title="회원가입" showBack />
      <Page>
        <Hero>
          <Mochi expression="excited" size="xl" />
          <HeroText>함께 시작해요!</HeroText>
        </Hero>

        <Form onSubmit={handleSubmit}>
          <AuthField label="이름 *" name="name" value={form.name} onChange={set('name')} placeholder="이름을 입력해주세요" required />

          <AuthField
            label="아이디"
            name="username"
            value={form.username}
            onChange={set('username')}
            placeholder="영문/숫자 6~20자"
            required
            action={
              <DupBtn type="button">중복확인</DupBtn>
            }
          />

          <AuthField label="비밀번호 *" name="password" type="password" value={form.password} onChange={set('password')} placeholder="영문/숫자/특수문자 포함 8자 이상" required />
          <AuthField label="비밀번호 확인 *" name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={set('passwordConfirm')} placeholder="비밀번호 재입력" required />
          <AuthField label="전화번호 *" name="phone" value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" required />
          <AuthField label="이메일 *" name="email" type="email" value={form.email} onChange={set('email')} placeholder="example@email.com" required />
          <AuthField label="별명 *" name="nickname" value={form.nickname} onChange={set('nickname')} placeholder="앱 내 표시명" required />

          <Row2>
            <GenderCard>
              <GenderLabel>성별</GenderLabel>
              <GenderBtns>
                <GenderBtn type="button" $active={form.gender === 'male'} onClick={() => setForm((p) => ({ ...p, gender: 'male' }))}>
                  남
                </GenderBtn>
                <GenderBtn type="button" $active={form.gender === 'female'} onClick={() => setForm((p) => ({ ...p, gender: 'female' }))}>
                  여
                </GenderBtn>
              </GenderBtns>
            </GenderCard>
            <AgeCard>
              <GenderLabel>연령대</GenderLabel>
              <AgeSelect value={form.ageGroup} onChange={set('ageGroup')}>
                {AGE_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </AgeSelect>
            </AgeCard>
          </Row2>

          <AuthField label="월 예산 *" name="budget" value={form.budget} onChange={set('budget')} placeholder="예: 500,000원" required />

          <Terms>
            <CheckRow>
              <input type="checkbox" checked={form.terms} onChange={set('terms')} />
              <span>[필수] 서비스 이용약관</span>
            </CheckRow>
            <CheckRow>
              <input type="checkbox" checked={form.privacy} onChange={set('privacy')} />
              <span>[필수] 개인정보 처리방침</span>
            </CheckRow>
            <CheckRow>
              <input type="checkbox" checked={form.marketing} onChange={set('marketing')} />
              <span>[선택] 마케팅 정보 수신</span>
            </CheckRow>
          </Terms>

          <Button type="submit" size="lg" fullWidth disabled={isPending}>
            {isPending ? '처리 중...' : '가입 완료'}
          </Button>
        </Form>
      </Page>
    </MobileLayout>
  );
}

export default Signup;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const HeroText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.brand};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DupBtn = styled.button`
  flex-shrink: 0;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.accent.pointBox};
  color: ${({ theme }) => theme.colors.accent.yellowDark};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const GenderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AgeCard = styled(GenderCard)``;

const GenderLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.brand2};
`;

const GenderBtns = styled.div`
  display: flex;
  gap: 8px;
`;

const GenderBtn = styled.button`
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.nav.fill : theme.colors.mint.light};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.text.ink};
`;

const AgeSelect = styled.select`
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.ink};
  outline: none;
  cursor: pointer;
`;

const Terms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
`;

const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
`;
