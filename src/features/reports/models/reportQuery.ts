import { Query } from "@/components";

export interface ReportQuery extends Query {
    id?: number;
    documentId?: number;
    title?: string;
    description?: string;
    key?: string;
    bookmark?: boolean;
    createdAt?: string;
}