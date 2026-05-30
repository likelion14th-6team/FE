import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from '../../hooks/useAuth';

/**
 * 토큰 기반 보호 라우트.
 *
 * - localStorage 토큰이 없으면 /login 으로 리다이렉트
 * - state.from 에 원래 가려던 위치를 담아서, 로그인 후 그 페이지로 돌아오게 함
 *
 * 사용 (App.jsx의 Outlet 패턴):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/" element={<Home />} />
 *     <Route path="/archive" element={<Archive />} />
 *     ...
 *   </Route>
 */
function ProtectedRoute() {
  const { isAuthenticated } = useAuthState();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
