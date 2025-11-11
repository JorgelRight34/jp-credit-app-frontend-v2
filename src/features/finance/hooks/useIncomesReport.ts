import { useQuery } from "@tanstack/react-query";
import { getIncomeReport } from "../services/financeClient";
import { getUrlParams } from "../../../utils/utils";
import { useEffect } from "react";
import { IncomeReportQuery } from "../models/incomeReportQuery";
import { useCurrentProject } from "../../../contexts/ProjectContext";
import { incomesQueryKey } from "../lib/constants";
import { IncomeReportResult } from "../models/incomeReportResult";

interface UseIncomesReportProps {
  query?: IncomeReportQuery;
}

interface UseIncomesReportReturn {
  incomes: IncomeReportResult;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const useIncomesReport = ({
  query = {},
}: UseIncomesReportProps): UseIncomesReportReturn => {
  const urlParams = getUrlParams(query);
  const { projectId } = useCurrentProject();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [incomesQueryKey, projectId, urlParams],
    queryFn: () => getIncomeReport(projectId!, query),
    enabled: !!projectId,
  });

  useEffect(() => {
    refetch();
  }, [query]);

  return {
    incomes: data || { items: [], totalCapital: 0, totalInterest: 0, total: 0 },
    isLoading,
    isError,
    refetch,
  };
};

export default useIncomesReport;
