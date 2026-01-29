
import { ClosedPeriodFormValues, TransactionFormValues } from "../lib/form";
import { ClosedPeriod } from "../models/closedPeriod";
import { Transaction } from "../models/transaction";
import { Query } from "@/models/query";
import { getModulePermissions } from "@/features/auth";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants";
import { transactionsCacheKey } from "../lib/constants";
import { PermissionsProvider } from "@/models/permissionsProvider";
import api from "@/lib/services/api";
import { fetchBlobWithQueryParams, fetchEntity, fetchWithQueryParams } from "@/lib/utils";
import { TransactionTimeline } from "../models/transactionTimeline";
import { PagedResponse } from "@/models";

const baseUrl = `/transactions`;

export const createTransaction = async (
  data: TransactionFormValues
): Promise<Transaction> => {
  const response = await api.post(baseUrl, data);
  return response.data;
};

const getTransactionTimeline = async (id: number): Promise<TransactionTimeline> => {
  return await fetchEntity(`transactions/${id}/timeline`, [], 0);
}

export const closePeriod = async (data: ClosedPeriodFormValues) => {
  const response = await api.post(`transactions/close-period`, data);
  return response.data;
};

export const getLastClosedPeriod = async (): Promise<ClosedPeriod> => {
  const response = await api.get(`${baseUrl}/last-closed-period`);
  return response.data;
}

export const deleteTransaction = async (id: number | string) => {
  if (!id) return;
  const response = await api.delete(`transactions/${id}`);
  return response.data;
};

export const getTransaction = async (id: number): Promise<Transaction> => {
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getTransactions = async (
  query: Query
): Promise<PagedResponse<Transaction>> => {
  const response = await fetchWithQueryParams("transactions", query)
  return response;
};

export const getTransactionsReportBlob = async (query?: Query) => {
  return fetchBlobWithQueryParams("transactions/export", query)
}

export const getTransactionsModulePermissions = async () => {
  return await getModulePermissions(baseUrl + "/" + PERMISSIONS_ENDPOINT_SUFFIX)
}

export const transactionPermissionsProvider: PermissionsProvider = {
  cacheKey: transactionsCacheKey,
  getPermissions: getTransactionsModulePermissions
}

export const transactionClient = {
  getTransaction,
  getTransactionTimeline,
  getTransactions,
  createTransaction,
  deleteTransaction,
  closePeriod,
  getLastClosedPeriod
}