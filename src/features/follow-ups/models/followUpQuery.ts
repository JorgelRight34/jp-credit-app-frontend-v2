import { Query } from "@/components";

export interface FollowUpQuery extends Query {
    title?: string;
    loanId?: number;
    clientId?: number;
}