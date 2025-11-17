import { FileModel } from "@/models/fileModel";
import { ReportKey } from "./reportKey";

export interface Report {
    id: number;
    documentId: number;
    key: ReportKey;
    title: string;
    description: string;
    document: FileModel;
    createdAt?: string | Date;
    bookmark: boolean;
}