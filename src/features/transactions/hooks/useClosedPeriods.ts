import { useQuery } from "@tanstack/react-query";
import { ClosedPeriodsQuery } from "../models/closedPeriodsQuery";
import { getUrlParams } from "../../../utils/utils";
import { getClosedPeriods } from "../services/transactionsClient";

interface UseClosedPeriodsProps {
  query: ClosedPeriodsQuery;
}

const useClosedPeriods = ({ query }: UseClosedPeriodsProps) => {
  const params = getUrlParams(query);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["closed-periods", params],
    queryFn: () => getClosedPeriods(query),
  });

  return { closedPeriods: data || [], isLoading, isError };
};

export default useClosedPeriods;
