import api from "@/services/api";
import { LoanFormValues } from "../lib/form";
import { LoanQuery } from "../models/loanQuery";;
import { Loan } from "../models/loan";
import { Query } from "@/models/query";
import { PagedResponse } from "@/models";
import { LoanMembers } from "../models/loanMembers";
import { getModulePermissions } from "@/features/auth";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { loansQueryKey, loansTag } from "../lib/constants";
import { Transaction } from "@/features/transactions";
import { fetchBlobWithQueryParams, fetchEntity, fetchWithQueryParams, getUrlParams } from "@/utils";


const baseUrl = "/loans";

export const createLoan = async (data: LoanFormValues): Promise<Loan> => {
  const response = await api.post(baseUrl, data);
  return response.data;
};

export const getLoan = async (id: number, cache?: number): Promise<Loan> => {
  return await fetchEntity(`${baseUrl}/${id}`, [loansTag, id.toString()], cache)
};

export const getFullLoan = async (id: number): Promise<Loan> => {
  return await getLoan(id);
}

export const getLoans = async (query?: Query): Promise<PagedResponse<Loan>> => {
  return await fetchWithQueryParams("loans", query)
}

export const editLoan = async (
  id: number,
  data: LoanFormValues,
): Promise<Loan> => {
  const response = await api.put(`${baseUrl}/${id}`, data);
  return response.data;
};

export const deleteLoan = async (id: number) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const getLoanOverduePayments = async (
  loanId: number,
  page: number
): Promise<Transaction[]> => {
  const response = await api.get(
    `${baseUrl}/${loanId}/overdue-payments?page=${page}`
  );
  return response.data;
};

export const downloadLoans = async (
  page = 1,
  query: LoanQuery,
  format = "csv"
): Promise<Blob> => {
  const response = await api.get(
    `${baseUrl}/export/${format}/?page=${page}&${getUrlParams(query)}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};


export const getLoanMembers = async (id: number): Promise<LoanMembers> => {
  const response = await api.get(`${baseUrl}/${id}/members`);
  return response.data;
}

export const getLoansReportBlob = async (query?: Query) => {
  return await fetchBlobWithQueryParams("loans/export/", query);
}

export const getLoanContractBlob = async (id: number | string) => {
  return await fetchBlobWithQueryParams(`loans/${id}/generate-contract`)
}

export const getLoanModulePermissions = async () => {
  return await getModulePermissions("loans/permissions")
}

export const loanModulePermissionsProvider: PermissionsProvider = {
  getPermissions: getLoanModulePermissions,
  cacheKey: loansQueryKey
}

export const loanClient = {
  getLoan,
  getLoans,
  getLoanMembers,
  createLoan,
  getLoansReportBlob,
  deleteLoan
}