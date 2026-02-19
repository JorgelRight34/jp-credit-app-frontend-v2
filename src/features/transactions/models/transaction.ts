import { User } from "@/features/auth";
import { TransactionType } from "./transactionType";

export interface Transaction {
    id: number;
    capitalValue: number;
    description?: string;
    interestValue: number;
    penaltyFee: number;
    outstandingAmount: number;
    loanId: number;
    clientId: number;
    actorId: string;
    date: string;
    createdBy: User;
    type: TransactionType;
    value: number;
    lateDays: number;
    isClosed: boolean;
    clientName: string;
    total: number;
}