import { Transaction } from "../models/transaction";

export const paymentFrequencyToMonths: Record<number, number> = {
    12: 1,  // monthly
    4: 3,   // quarterly
    2: 6,   // semi-annual
    1: 12,  // yearly
};

export const getTransactionIdLabel = (transaction: Transaction) => `${transaction.type.toUpperCase()} - ${transaction.id}`