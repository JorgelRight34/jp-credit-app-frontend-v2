import { TransactionType } from "./transactionType";
import { ProfileSummary } from "@/features/profiles";

export interface Transaction {
    id: number;
    legacyId?: number;
    capitalValue: number;
    description?: string;
    interestValue: number;
    penaltyFee: number;
    actor?: ProfileSummary;
    loanId: number;
    clientId: number;
    feePaid: number;
    actorId: string;
    date: string;
    createdByUsername: string;
    type: TransactionType;
    value: number;
    isClosed: boolean;
    client: ProfileSummary;
}

export type PropsWithTransaction<T = object> = { transaction: Transaction } & T;