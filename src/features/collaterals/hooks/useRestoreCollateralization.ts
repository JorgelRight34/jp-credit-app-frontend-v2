import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollateralizationByCollateralId } from "../services/collateralsClient";
import { collateralsQueryKey } from "../lib/constants";

const useRestoreCollateralization = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: deleteCollateralizationByCollateralId,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [collateralsQueryKey] }),
  });

  return { restoreCollateralization: mutateAsync, isPending, isError };
};

export default useRestoreCollateralization;
