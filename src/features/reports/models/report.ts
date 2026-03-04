import { FileModel } from "@/models/fileModel";

export interface Report {
    id: number;
    documentId: number;
    title: string;
    description?: string;
    key: "loan" | "collateral";
    bookmark: boolean;
    createdAt: string;
    documents?: Array<FileModel>;
}