import { ProfileSummary } from "@/features/profiles";
import type { LoanStatus } from "./loanStatus";

export interface Loan {
    id: number;
    legacyId: number;
    projectId: number;
    guarantorId?: number;
    loanOfficerId?: number;
    interestBalance: number;
    lastTransactionDate?: string;
    feePaid: number;
    arrearBalance: number;
    client: ProfileSummary;
    penaltyBalance: number;
    loanPurposeId: number;
    guarantor?: ProfileSummary;
    loanOfficer?: ProfileSummary;
    isActive: boolean;
    daysOfGrace: number;

    penaltyRate: number;

    // Loan details
    approvedAmount: number; // Monto aprobado
    description?: string; // Optional property
    disbursedAmount: number; // Monto desembolsado
    principalBalance: number;
    accruedInterest: number;
    annualInterestRate: number;
    numberOfPayments: number;
    paymentFrequency: LoanPaymentFrequency; // Times paid in a year (monthly = 12, yearly = 1...)
    expirationDate: Date | string;

    // Details
    paymentValue: number;
    startDate: string; // Date as ISO string (DateOnly is replaced by string in TypeScript)
    deliveryDate: string; // Entrega
    status: LoanStatus;

    clientId: number
    loanPurpose: string

    // Audit fields
    createdAt: Date | string; // DateTime in C# is replaced by string (ISO format) in TypeScript
    updatedAt: Date | string; // Same as above
}

export type PropsWithLoan<T = object> = { loan: Loan } & T;

export type LoanPaymentFrequency = 1 | 12 | 4 | 2