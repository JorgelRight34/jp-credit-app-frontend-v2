import { LoanStatus } from "@/features/loans";
import { Transaction } from "./transaction";

export interface PaymentResult {
    transaction: Transaction;
    loanBefore: LoanSnapshot;
    loanAfter: LoanSnapshot;
    effectivePaymentDate: string;
    loanPaymentValue: number;
}

interface LoanSnapshot {
    accruedCapital: number;
    totalFees: number;
    feePaid: number;
    outstandingAmount: number;
    accruedInterest: number;
    status: LoanStatus
}