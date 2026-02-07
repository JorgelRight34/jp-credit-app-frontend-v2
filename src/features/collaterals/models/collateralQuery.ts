import type { CollateralStatus } from "./collateralStatus";
import type { CollateralType } from "./collateralType";
import type { Query } from "@/components";

export type CollateralQuery = Query & {
    ownerId?: number;
    title?: string;
    type?: CollateralType
    status?: CollateralStatus
}