import { serverClient } from "@/lib/services/serverClient";
import { Transaction } from "../models/transaction";
import { AccountingPeriod } from "../models/accountingPeriod";

export const getTransactionFromServer = async (id: Transaction["id"]): Promise<Transaction> => {
    return await serverClient.get("transactions/" + id);
}

export const getCurrentAccountingPeriodFromServer = async (): Promise<AccountingPeriod> => {
    return await serverClient.get("transactions/closed-periods/current");
}