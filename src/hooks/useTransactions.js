import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  fetchDailyTransactions,
  fetchTransactionCalendar,
} from "../api/transactions";
import { useAuthState } from "./useAuth";

export function useTransactionCalendar(year, month) {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ["transactions", "calendar", year, month],
    queryFn: () => fetchTransactionCalendar({ year, month }),
    enabled: isAuthenticated && Boolean(year && month),
    staleTime: 1000 * 60,
  });
}

export function useDailyTransactions(dateKey) {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ["transactions", "daily", dateKey],
    queryFn: () => fetchDailyTransactions({ date: dateKey }),
    enabled: isAuthenticated && Boolean(dateKey),
    staleTime: 1000 * 30,
  });
}

export function useCreateTransaction() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["reports", "summary"] });
    },
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["reports", "summary"] });
    },
  });
}
