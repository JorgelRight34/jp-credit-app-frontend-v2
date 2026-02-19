import { Transaction } from "../models/transaction";

export const getTransactionLabel = (transaction: Transaction) => `${transaction.type.toUpperCase()} No.${transaction.id}`