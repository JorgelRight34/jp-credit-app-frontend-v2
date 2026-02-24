import { Query } from "@/components";

export interface ClosedPeriodQuery extends Query {
    startDate?: string;
    endDate?: string;
}