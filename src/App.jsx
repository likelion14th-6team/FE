import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Home from './pages/Home';
import Login from './pages/Login';
import KakaoCallback from './pages/KakaoCallback';
import Signup from './pages/Signup';
import Archive from './pages/Archive';
import Register from './pages/Register';
import Report from './pages/Report';
import MyPage from './pages/MyPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';

// TanStack Query 전역 설정.
// staleTime: 데이터가 "신선한" 시간. 이 동안엔 자동 refetch 안 함.
// retry: 실패 시 재시도 횟수. 사용자 페이지가 너무 많이 재시도하지 않도록 1로.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            {/* 누구나 접근 가능 — OAuth 콜백 */}
            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />

            {/* 비로그인 전용 — 로그인된 상태로 들어오면 /로 보냄 */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* 로그인 필수 — 미로그인 상태면 /login 으로 보냄 */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/register" element={<Register />} />
              <Route path="/report" element={<Report />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      {/* dev에서만 보이는 캐시 시각화 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
