import { useMutation, useQueryClient } from "@tanstack/react-query";
import { liquidateCollateral } from "../services/collateralsClient";
import { collateralsQueryKey } from "../lib/constants";

const useLiquidateCollateral = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: liquidateCollateral,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [collateralsQueryKey] }),
  });

  return { liquidateCollateral: mutateAsync, isPending, isError };
};

export default useLiquidateCollateral;
