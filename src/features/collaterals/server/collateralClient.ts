import type { Collateral } from "../models/collateral"
import { serverClient } from "@/lib/services/serverClient"

export const getCollateralFromServer = async (id: number) => {
    return await serverClient.get<Collateral>("collaterals/" + id);
}