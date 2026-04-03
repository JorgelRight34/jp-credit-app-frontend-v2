import type { CollateralCondition } from "./collateralCondition";
import type { CollateralType } from "./collateralType";
import type { FileModel } from "@/models/fileModel";

export interface Collateral {
    id: number;
    title: string;
    description?: string;
    value: number;
    condition: CollateralCondition;
    createdAt: string;
    updatedAt: string;
    isActive?: boolean;
    loanId: number;
    type: CollateralType;
    location?: string;
    expirationDate?: string;
    liquidationDate?: string;
    soldFor?: number;
    loanClientName: string;
    soldDate?: string;
    files: Array<FileModel>;
}