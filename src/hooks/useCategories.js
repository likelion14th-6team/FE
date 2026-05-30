import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categories";
import { useAuthState } from "./useAuth";

/**
 * 카테고리 목록 (소비 등록 등)
 *
 * @param {'INCOME' | 'EXPENSE' | null} type — null 이면 전체
 */
export function useCategories(type = "EXPENSE") {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ["categories", type ?? "all"],
    queryFn: () => fetchCategories(type ? { type } : {}),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10,
  });
}
