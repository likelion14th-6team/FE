import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/archive');
  };

  return (
    <Wrapper>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
      </TopBar>

      <Card>
        <Logo>slog</Logo>
        <Tagline>소비를 기록하고, 나를 발견하세요</Tagline>

        <Form onSubmit={handleSubmit}>
          <FieldLabel>
            이메일
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required />
          </FieldLabel>
          <FieldLabel>
            비밀번호
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" required />
          </FieldLabel>
          <PrimaryButton type="submit">로그인</PrimaryButton>
        </Form>

        <SignupRow>
          아직 계정이 없으신가요?{' '}
          <LinkBtn onClick={() => navigate('/signup')}>회원가입</LinkBtn>
        </SignupRow>
      </Card>
    </Wrapper>
  );
}

export default Login;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #0f131c;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  &:hover { opacity: 0.85; }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(15, 19, 28, 0.12);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  background: rgba(255, 255, 255, 0.7);
  &:focus { border-color: #0f131c; background: #fff; }
`;

const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 500;
  color: #77927e;
  font-size: 13px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  color: #0f131c;
  &:hover { background: rgba(255, 255, 255, 0.85); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px;
  max-width: 393px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  width: 100%;
  max-width: 393px;
  margin-bottom: 12px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 393px;
  background: #fff;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 4px 26px rgba(0, 0, 0, 0.06);
`;

const Logo = styled.h1`
  font-family: 'GeekbleMalang', sans-serif;
  font-weight: 800;
  font-size: 44px;
  text-align: center;
  color: #0f131c;
`;

const Tagline = styled.p`
  text-align: center;
  color: #aaa;
  font-weight: 300;
  margin: 8px 0 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SignupRow = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #888;
  font-weight: 300;
  font-size: 14px;
`;

const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #0f131c;
  font-weight: 700;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;
