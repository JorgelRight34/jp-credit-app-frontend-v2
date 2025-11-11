import api from "../../../services/api";
import { fetchBlobWithQueryParams, fetchWithQueryParams, } from "../../../utils/utils";
import { TransactionFormValues } from "../lib/form";
import { ClosePeriodRequest } from "../models/closePeriodRequest";
import { ClosedPeriodsQuery } from "../models/closedPeriodsQuery";
import { ClosedPeriod } from "../models/closedPeriod";
import { Transaction } from "../models/transaction";
import { PagedResponse } from "../../../models/pagedResponse";
import { Query } from "@/models/query";
import { getModulePermissions } from "@/features/Auth/services/userService";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants";
import { transactionsCacheKey } from "../lib/constants";
import { PermissionsProvider } from "@/models/permissionsProvider";

const baseUrl = `/transactions`;

export const createTransaction = async (
  data: TransactionFormValues
): Promise<Transaction> => {
  const response = await api.post(baseUrl, data);
  return response.data;
};

export const closePeriod = async (data: ClosePeriodRequest) => {
  const response = await api.post(`transactions/close-period`, data);
  return response.data;
};

export const getClosedPeriods = async (
  query: ClosedPeriodsQuery
): Promise<ClosedPeriod[]> => {
  return await fetchWithQueryParams(`${baseUrl}/closed-periods/`, query)
};

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