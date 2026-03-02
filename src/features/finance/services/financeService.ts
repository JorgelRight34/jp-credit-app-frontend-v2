import api from "@/lib/services/api";
import { FinanceQuery } from "../models/financeQuery";
import { FinanceReport } from "../models/financeReport";
import { Transaction } from "@/features/transactions";
import { FinancialBreakdown } from "../models/financialBreakdown";
import { ProjectionResult } from "../models/projectionResult";

const baseUrl = "finance";

const getFinanceReport = async (
    type: string,
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

export const getProjectionsPerInterval = async (params: FinanceQuery): Promise<ProjectionResult> => {
    const { data } = await api.get(`${baseUrl}/payment-projection`, {
        params: {
            start: params.startDate,
            end: params.endDate,
            timeDiff: params.interval,
        }
    });
    return data;
}

export const getProjectedIncomes = async (params: FinanceQuery): Promise<Array<FinancialBreakdown>> => {
    const { data } = await api.get(`${baseUrl}/payment-projection/summaries`, {
        params: {
            start: params.startDate,
            end: params.endDate,
            timeDiff: params.interval
        }
    })
    return data;
}

export const getIncomes = async (query: FinanceQuery) => {
    const data = await getIncomesPerInterval(query)
    return data.items
}

export const getExpenses = async (query: FinanceQuery) => {
    const data = await getExpensesPerInterval(query)
    return data.items
}
