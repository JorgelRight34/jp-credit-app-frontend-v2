import { projectionsCacheKey } from "../lib/constants";
import { useData } from "@/hooks/useData";
import { FinanceQuery } from "../models/financeQuery";
import { Period } from "../models/period";
import { splitIntoPeriods } from "../lib/lib";

export interface UseFinancePeriodsProps {
  query: FinanceQuery;
}

export const useFinancePeriods = ({
  query,
}: UseFinancePeriodsProps) => {

  const { data, isLoading, isError } = useData<Period[]>({
    key: [...projectionsCacheKey, ...Object.entries(query)],
    getData: () => {
      return splitIntoPeriods(new Date(query.start), new Date(query.end), query.timeUnit, query.timeUnit);
    },
  });

  return {
    periods: data || [],
    isLoading,
    isError,
  };
};
