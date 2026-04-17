import { Transaction } from "../models/transaction";

export const buildTransactionLabel = (transaction: Transaction) => `${transaction.type.toUpperCase()}-${transaction.id}`