import { Collateral } from "../models/collateral";
import { getCollateral } from "../services/collateralsClient";
import { collateralsQueryKey } from "../lib/constants";
import { useData } from "@/hooks/useData";

/**
 * Fetches collateral data by ID, first checking in-memory cache
 */
interface UseCollateralProps {
    id?: number | string;
}

const useCollateral = ({ id }: UseCollateralProps) => {
    const numericId = Number(id);
    const { data, isLoading, isError } = useData<Collateral>({
        key: [collateralsQueryKey, numericId],
        getData: () => getCollateral(numericId),
        enabled: !!id,
    });

    return { collateral: data, isError, isLoading };
};

export default useCollateral;
