import type { CollateralType } from "./collateralType";
import type { Query } from "@/components";

export type CollateralQuery = Query & {
    ownerId?: number;
    title?: string;
    type?: CollateralType
    minValue?: number;
    maxValue?: number;
    isActive?: boolean;
}