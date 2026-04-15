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
    penaltyBalance: number;
    arrearBalance: number;
    accruedInterest: number;
    status: LoanStatus
}

export type PropsWithPaymentResult<T = object> = {
    paymentResult: PaymentResult
} & T;