import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MobileLayout from "../components/common/MobileLayout";
import Button from "../components/common/Button";
import Mochi from "../components/common/Mochi";
import AuthField from "../components/auth/AuthField";
import AuthDivider from "../components/auth/AuthDivider";
import { useLogin, useAuthState } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  // 토큰이 있으면 이미 로그인된 상태 → 메인으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ username, password });
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "아이디 또는 비밀번호를 다시 확인해주세요.";
      alert("로그인 실패: " + msg);
    }
  };

  return (
    <MobileLayout $hasBottomNav={false}>
      <Page>
        <Brand>
          <Mochi expression="happy_wave" size="xl" />
          <BrandText>
            <Logo>Slog</Logo>
            <Tagline>내 소비를 돌아보는 시간</Tagline>
          </BrandText>
        </Brand>

        <Form onSubmit={handleSubmit}>
          <Fields>
            <AuthField
              label="아이디"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력해주세요"
              required
            />
            <AuthField
              label="비밀번호"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={login.isPending}
            >
              {login.isPending ? "로그인 중..." : "로그인"}
            </Button>
          </Fields>

          <AuthDivider />

          <KakaoBtn
            type="button"
            onClick={() => alert("카카오 로그인은 준비 중입니다.")}
          >
            카카오톡으로 시작하기
          </KakaoBtn>
        </Form>

        <Footer>
          아직 회원이 아니신가요?{" "}
          <LinkBtn type="button" onClick={() => navigate("/signup")}>
            회원가입
          </LinkBtn>
        </Footer>
      </Page>
    </MobileLayout>
  );
}

export default Login;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 40px;
  gap: 32px;
  min-height: calc(100vh - 52px);
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 10px;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.brand2};
`;

const Tagline = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.brand};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const KakaoBtn = styled.button`
  width: 100%;
  padding: 20px 30px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.cardLg};
  background: ${({ theme }) => theme.colors.accent.kakao};
  color: #0a0a0a;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.92;
  }
`;

const Footer = styled.p`
  margin-top: auto;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.gray};
  text-align: center;
`;

const LinkBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.ink};
  text-decoration: underline;
  cursor: pointer;
`;
