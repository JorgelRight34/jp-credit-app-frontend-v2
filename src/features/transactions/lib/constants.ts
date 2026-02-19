import type { Transaction } from '../models/transaction'


export const mockTransaction: Transaction = {
    id: 999,
    capitalValue: 4500,
    interestValue: 320,
    penaltyFee: 80,
    outstandingAmount: 1200,
    loanId: 12,
    payerId: 5,
    description: 'Liquidación total del préstamo por garantía',
    date: new Date().toISOString(),
    type: "pc",
    value: 4900,
    lateDays: 12,
    isClosed: true,
    clientName: 'Juan Pérez',
    total: 4900,
    createdBy: {}
}
