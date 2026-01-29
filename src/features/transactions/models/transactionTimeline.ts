import { Transaction } from "./transaction";

export interface TransactionTimeline {
  lastTransaction?: Transaction;
  nextTransaction?: Transaction;
}
