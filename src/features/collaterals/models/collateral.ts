import type { CollateralType } from "./collateralType";
import type { FileModel } from "@/models/fileModel";

export interface Collateral {
    id: number;
    title: string;
    description: string;
    value: number;
    condition: string;
    createdAt: string;
    ownerName?: string;
    loanId: number;
    type: CollateralType;
    location?: string;
    expirationDate?: string;
    liquidationDate?: string;
    files: Array<FileModel>;
}