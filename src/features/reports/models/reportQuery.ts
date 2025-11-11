import { Query } from "@/models/query";
import { ReportKey } from "./reportKey";

export type ReportQuery = Query & {
    title?: string
    name?: string;
    reportKey?: ReportKey;
    id?: number;
    bookmark?: boolean;
}