import api from "@/lib/services/api";
import { FinanceQuery } from "../models/financeQuery";
import { FinanceReport } from "../models/financeReport";
import { Transaction } from "@/features/transactions";

const baseUrl = "finance";

const getFinanceReport = async (
    type: "incomes" | "expenses",
    params: FinanceQuery
): Promise<FinanceReport<Transaction>> => {
    const { data } = await api.get(`${baseUrl}/${type}`, {
        params: {
            start: params.startDate,
            end: params.endDate,
            timeDiff: params.interval,
        },
    });

    return data;
};

export const getIncomesPerInterval = (params: FinanceQuery) =>
    getFinanceReport("incomes", params);

export const getExpensesPerInterval = (params: FinanceQuery) =>
    getFinanceReport("expenses", params);