import { CacheKey } from "@/models";
import { TransactionType } from "../models/transactionType";

export const transactionTypesFullNames: Record<TransactionType, string> = {
  [TransactionType.DS]: "Desembolso",
  [TransactionType.PC]: "Pago Cuota",
};

export const transactionsCacheKey: CacheKey = ["transactions"];

