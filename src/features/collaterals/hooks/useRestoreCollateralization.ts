import { deleteCollateralizationByCollateralId } from "../services/collateralsClient";
import { collateralsQueryKey } from "../lib/constants";
import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";

export const useRestoreCollateralization = () => {
  const dataClient = useDataClient()

  const { mutateAsync, isPending, isError } = useDataMutation({
    mutationFn: deleteCollateralizationByCollateralId,
    onSuccess: () =>
      dataClient.invalidate({ key: collateralsQueryKey }),
  });

  return { restoreCollateralization: mutateAsync, isPending, isError };
};

export default useRestoreCollateralization;
