import { useDataClient } from "@/hooks/useDataClient";
import { useDataMutation } from "@/hooks/useMutate";
import { collateralClient } from "../services/collateralsClient";
import { collateralsQueryKey } from "../lib/constants";

export const useLiquidateCollateral = () => {
  const dataClient = useDataClient();

  const { mutateAsync, isPending, isError } = useDataMutation({
    mutationFn: collateralClient.liquidateCollateral,
    onSuccess: () =>
      dataClient.invalidate({ key: collateralsQueryKey }),
  });

  return { liquidateCollateral: mutateAsync, isPending, isError };
};

