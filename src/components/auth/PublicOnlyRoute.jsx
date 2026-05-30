import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../../hooks/useAuth';

/**
 * "비로그인 전용" 라우트.
 *
 * 이미 로그인된 사용자가 /login 이나 /signup 에 다시 들어오면
 * 홈으로 리다이렉트.
 *
 * 사용:
 *   <Route element={<PublicOnlyRoute />}>
 *     <Route path="/login" element={<Login />} />
 *     <Route path="/signup" element={<Signup />} />
 *   </Route>
 */
function PublicOnlyRoute() {
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
