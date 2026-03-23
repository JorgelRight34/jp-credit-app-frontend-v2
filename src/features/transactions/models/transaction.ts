import { TransactionType } from "./transactionType";
import { ProfileSummary } from "@/features/profiles";

export interface Transaction {
    id: number;
    capitalValue: number;
    description?: string;
    interestValue: number;
    penaltyFee: number;
    arrearBalance?: number;
    actor?: ProfileSummary;
    loanId: number;
    clientId: number;
    feePaid: number;
    actorId: string;
    date: string;
    createdByUsername: string;
    type: TransactionType;
    value: number;
    lateDays: number;
    isClosed: boolean;
    client: ProfileSummary;
}