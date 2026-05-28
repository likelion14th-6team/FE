import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBudgets, createBudget } from '../api/budget';
import { useAuthState } from './useAuth';

/**
 * 예산 목록.
 *
 * const { data: budgets, isLoading } = useBudgets();
 */
export function useBudgets() {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
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
