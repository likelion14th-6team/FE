import { useQuery } from "@tanstack/react-query";
import { fetchReportSummary } from "../api/reports";
import { useAuthState } from "./useAuth";

export function useReportSummary(targetMonth) {
  const { isAuthenticated } = useAuthState();

  return useQuery({
    queryKey: ["reports", "summary", targetMonth],
    queryFn: () => fetchReportSummary({ targetMonth }),
    enabled: isAuthenticated && Boolean(targetMonth),
    staleTime: 1000 * 60,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 1;
    },
  });
}
