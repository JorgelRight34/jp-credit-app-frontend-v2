import type { CollateralType } from "./collateralType";
import type { FileModel } from "@/models/fileModel";

export interface Collateral {
    id: number;
    title: string;
    description: string;
    value: number;
    ownerId: number;
    condition: string;
    createdAt: string;
    status: string;
    ownerName?: string;
    loanId: number;
    type: CollateralType;
    location?: string;
    expirationDate?: string;
    liquidationDate?: string;
    files: Array<FileModel>;
}