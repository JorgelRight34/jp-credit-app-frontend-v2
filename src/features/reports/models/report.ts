import { ApiFile } from "@/models";
import { ReportKey } from "./reportKey";

export interface Report {
    id: number;
    documentId: number;
    key: ReportKey;
    title: string;
    description: string;
    document: ApiFile;
    createdAt?: string | Date;
    bookmark: boolean;
}