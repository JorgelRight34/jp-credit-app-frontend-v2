import { ApiFile } from "@/models";

export interface CollateralFile {
    id: number;
    fileUploadId: number;
    collateralId: number;
    fileUpload: ApiFile;
}