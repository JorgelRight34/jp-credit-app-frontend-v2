import { collateralsQueryKey } from "./constants";
import type { Collateral } from "../models/collateral";

export const buildCollateralQueryKey = (id: Collateral["id"]) => {
    return [collateralsQueryKey, id]
}

export const buildCollateralChangeHistoryKey = (id: Collateral["id"]) => [collateralsQueryKey, id, "ch"]