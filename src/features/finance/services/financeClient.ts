import { dateToIsoString, fetchBlobWithQueryParams, fetchWithQueryParams } from "@/lib/utils/utils";
import { FinanceQuery } from "../models/financeQuery";
import { FinanceReport } from "../models/financeReport";
import { createDateRangeStringQueryInterceptor } from "@/components";
import { FinancialBreakdown } from "../models/financialBreakdown";
import { Projection } from "../models/projection";
import { PagedResponse } from "@/models";
import { defaultFinanceQuery } from "../lib/constants";
import { TransactionType } from "@/features/transactions";
import { LoanQuery } from "@/features/loans";

const baseUrl = "finance"

export const getProjections = async (
  query: FinanceQuery = defaultFinanceQuery
): Promise<PagedResponse<Projection>> => {
  return await fetchWithQueryParams(
    `${baseUrl}/payment-projection`,
    query,
    [createDateRangeStringQueryInterceptor(["start", "end"])]
  )
};

export const getFinancialReport = async (
  query: FinanceQuery
): Promise<FinanceReport> => {
  return await fetchWithQueryParams(
    `${baseUrl}/${query.type == TransactionType.DS ? "expenses" : "incomes"}`,
    query, [createDateRangeStringQueryInterceptor(["start", "end"])]
  );
};

export const getProjectedIncomes = async (data: FinanceQuery): Promise<FinancialBreakdown> => {
  return await fetchWithQueryParams(`${baseUrl}/payment-projection/summary`, {
    ...data, start: dateToIsoString(data.start), end: dateToIsoString(data.end), limit: undefined
  })
}

export const getProjectedIncomesByPeriod = async (data: FinanceQuery): Promise<FinancialBreakdown[]> => {
  return await fetchWithQueryParams(`${baseUrl}/payment-projection/summaries`, {
    ...data, start: dateToIsoString(data.start), end: dateToIsoString(data.end), limit: undefined
  })
}

export const exportProjections = async (data: LoanQuery) => {
  return await fetchBlobWithQueryParams(`${baseUrl}/monthly-payment-projection/export`, data)
}

export const financeClient = {
  exportProjections,
  getProjectedIncomesByPeriod,
  getProjectedIncomes,
  getFinancialReport,
  getProjections
}