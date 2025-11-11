import { useDataClient } from "@/hooks/useDataClient";
import { closePeriod } from "../services/transactionsClient";
import { useDataMutation } from "@/hooks/useMutate";

const useClosePeriod = () => {
  const dataClient = useDataClient();
  const { mutateAsync, isPending } = useDataMutation({
    mutationFn: closePeriod,
    onSuccess: () =>
      dataClient.invalidateQueries({ queryKey: ["closed-periods"] }),
  });

  return { closePeriod: mutateAsync, isPending };
};

export default useClosePeriod;
