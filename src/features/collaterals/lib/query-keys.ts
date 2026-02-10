import { collateralsQueryKey } from "./constants";
import type { Collateral } from "../models/collateral";

export const createCollateralKey = (id: Collateral["id"]) => {
    return [collateralsQueryKey, id]
}