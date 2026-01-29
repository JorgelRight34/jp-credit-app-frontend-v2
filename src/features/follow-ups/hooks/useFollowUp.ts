import { getFollowUp } from "../services/followUpClient";
import { followUpsCacheKey } from "../lib/constants";
import { useData } from "@/hooks/useData";

interface UseFollowUpProps {
  id?: number | string;
}

const useFollowUp = ({ id }: UseFollowUpProps) => {
  const numericId = Number(id);

  const { data, isLoading, isError } = useData({
    key: [followUpsCacheKey, numericId],
    getData: () => getFollowUp(numericId),
    enabled: !!numericId,
  });

  return { followUp: data, isLoading, isError };
};

export default useFollowUp;
