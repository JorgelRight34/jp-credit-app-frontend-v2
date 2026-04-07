import { FileModel } from "@/models/fileModel";

export interface Report {
    id: number;
    documentId: number;
    title: string;
    description?: string;
    key: "Loan" | "Collateral" | "Transaction";
    createdAt: string;
    documents: Array<FileModel>;
}

export type PropsWithReportKey<T = object> = { reportKey: Report["key"] } & T

export interface PropsWithReport { report: Report }