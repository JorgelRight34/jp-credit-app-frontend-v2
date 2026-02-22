import type { LoanStatus } from "./loanStatus";

export interface Loan {
    id: number;
    projectId: number;
    guarantorId?: number;
    loanOfficerId?: number;
    overduePaymentsNumber?: number;
    interestBalance: number;
    lastTransactionDate?: Date | string;
    feePaid: number;
    outstandingAmount: number;
    client: LoanMember;
    totalFees: number;
    guarantor?: LoanMember;
    loanOfficer?: LoanMember;
    isActive: boolean;
    daysOfGrace: number;

    clientProfileId: number;
    guarantorProfileId?: number;
    loanOfficerProfileId?: number;
    penaltyRate: number;

    // Loan details
    approvedAmount: number; // Monto aprobado
    description?: string; // Optional property
    disbursedAmount: number; // Monto desembolsado
    principalBalance: number;
    accruedInterest: number;
    annualInterestRate: number;
    numberOfPayments: number;
    paymentFrequency: LoanPaymentFrequency;
    expirationDate: Date | string;
    latePaymentCredit: number; // Abono de mora (mora pagada)
    isOverdue: boolean;
    lastPaymentDate?: string;
    effectivePaymentDate: string;

    // Details
    paymentValue: number;
    startDate: string; // Date as ISO string (DateOnly is replaced by string in TypeScript)
    deliveryDate: string; // Entrega
    status: LoanStatus;

    clientId: number
    overduePayments: number;
    delinquency: number;

    hasPayments: boolean;

    // Audit fields
    createdAt: Date | string; // DateTime in C# is replaced by string (ISO format) in TypeScript
    updatedAt: Date | string; // Same as above
}

export type LoanPaymentFrequency = 1 | 12 | 4 | 2

export type LoanMember = {
    firstName: string;
    lastName: string;
    profileId: number;
}