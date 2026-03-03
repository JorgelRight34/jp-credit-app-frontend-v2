import type { Loan } from "../models/loan"
import type { LoanQuery } from "../models/loanQuery"
import type { PagedResponse } from "@/models"
import api from "@/lib/services/api"
import { LoanFormValues } from "../lib/schemas/loanFormSchema"
import { LoanStatus } from "../models/loanStatus"
import { ExportHandler } from "@/components"
import { ProfileSummary } from "@/features/profiles"

const baseUrl = "loans"

export const getLoans = async (params: LoanQuery): Promise<PagedResponse<Loan>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const getLoan = async (id: Loan["id"]): Promise<Loan> => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const createLoan = async (body: LoanFormValues): Promise<Loan> => {
    const { data } = await api.post(baseUrl, body);
    return data;
}

export const deleteLoan = async (id: Loan["id"]) => {
    await api.delete(baseUrl + "/" + id);
}

export const updateLoanStatus = async (id: Loan["id"], status: LoanStatus) => {
    await api.put(baseUrl + "/" + id + "/status", { status });
}

export const getLoanActors = async (loanId: Loan["id"]): Promise<{
    client: ProfileSummary,
    guarantor?: ProfileSummary,
    loanOfficer?: ProfileSummary
}> => {
    const { data } = await api.get(baseUrl + "/" + loanId + "/actors");
    return data;
}

export const exportLoans: ExportHandler<LoanQuery> = async (options, params) => {
    const { data } = await api.get(baseUrl, { params: { ...params, ...options } })
    return data;
}