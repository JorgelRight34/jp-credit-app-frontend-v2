import { LoanStatus } from "@/features/loans";
import { Transaction } from "./transaction";

export interface PaymentResult {
    transaction: Transaction;
    loanBefore: LoanSnapshot;
    loanAfter: LoanSnapshot
}

interface LoanSnapshot {
    accruedCapital: number;
    totalFees: number;
    feePaid: number;
    accruedInterest: number;
    status: LoanStatus
}