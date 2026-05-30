import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBudget, fetchBudgets, upsertBudget } from '../api/budget';
import { getCurrentTargetMonth } from '../utils/userProfile';
import { useAuthState } from './useAuth';

/**
 * 예산 목록.
 *
 * const { data: budgets, isLoading } = useBudgets();
 */
export function useBudgets(targetMonth = getCurrentTargetMonth()) {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ['budgets', targetMonth],
    queryFn: () => fetchBudgets({ targetMonth }),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      // 해당 월 예산 미설정(404)은 에러 UI 대신 빈 상태로 처리
      if (error?.response?.status === 404) return false;
      return failureCount < 1;
    },
  });
}

/**
 * 예산 생성/갱신.
 *
 * const create = useCreateBudget();
 * create.mutate({ targetMonth: '2026-05', targetAmount: 500000 });
 */
export function useCreateBudget() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

/** 마이페이지 등 — 기존 예산 있으면 PATCH, 없으면 POST */
export function useUpsertBudget() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: upsertBudget,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}
