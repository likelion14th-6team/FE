import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBudgets, createBudget } from '../api/budget';

/**
 * 예산 목록.
 *
 * const { data: budgets, isLoading } = useBudgets();
 */
export function useBudgets() {
  const hasToken = !!localStorage.getItem('token');

  return useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets,
    enabled: hasToken,
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
