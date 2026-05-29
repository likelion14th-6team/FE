import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMe, patchMe } from '../api/user';
import { useAuthState } from './useAuth';

/**
 * 현재 로그인 사용자 정보.
 *
 * const { data: user, isLoading, isError, error } = useMe();
 *
 * - 토큰이 없으면 자동으로 호출 안 함 (enabled).
 * - 5분 동안 캐시 (staleTime). 여러 컴포넌트에서 동시 호출해도 한 번만 fetch.
 */
export function useMe() {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

/**
 * 사용자 정보 수정.
 *
 * const patch = usePatchMe();
 * patch.mutate({ nickname: '새이름' });
 *
 * - 성공 시 'me' 캐시 자동 갱신.
 */
export function usePatchMe() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchMe,
    onSuccess: (data) => {
      // PATCH 응답이 일부 필드만 올 수 있어 기존 me와 병합
      if (data?.userId) {
        qc.setQueryData(['me'], (prev) => (prev ? { ...prev, ...data } : data));
      }
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
