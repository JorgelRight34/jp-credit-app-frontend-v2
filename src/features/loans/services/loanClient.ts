import type { Loan } from "../models/loan"
import type { LoanQuery } from "../models/loanQuery"
import type { PagedResponse } from "@/models"
import api from "@/lib/services/api"
import { LoanCreateFormValues } from "../lib/schemas/loanCreateFormSchema"
import { LoanStatus } from "../models/loanStatus"
import { ExportHandler } from "@/components"
import { ProfileSummary } from "@/features/profiles"
import { LoanPurposeQuery } from "../models/loanPurposeQuery"
import { LoanPurpose } from "../models/loanPurpose"
import { LoanPurposeFormValues } from "../lib/schemas/loanPurposeFormSchema"
import { LoanEditFormValues } from "../lib/schemas/loanEditFormSchema"
import { withProjectIdParams } from "@/features/projects"
import { ChangeHistory, ChangeLogQuery } from "@/features/audit"

const baseUrl = "loans"

export const getLoans = async (params: LoanQuery): Promise<PagedResponse<Loan>> => {
    const { data } = await api.get(baseUrl, { params: withProjectIdParams(params) })
    return data;
}

export const getLoan = async (id: Loan["id"]): Promise<Loan> => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const createLoan = async (body: LoanCreateFormValues): Promise<Loan> => {
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
    return await api.get(baseUrl + "/reports/export", {
        params: withProjectIdParams({ ...params, ...options }),
        responseType: "blob"
    })
}

export const getLoanPurposes = async (params: LoanPurposeQuery): Promise<PagedResponse<LoanPurpose>> => {
    const { data } = await api.get(`${baseUrl}/purposes`, { params })
    return data;
}

export const getLoanPurpose = async (id: LoanPurpose["id"]): Promise<LoanPurpose> => {
    const { data } = await api.get(`${baseUrl}/purposes/${id}`)
    return data;
}

export const createLoanPurpose = async (body: LoanPurposeFormValues): Promise<LoanPurpose> => {
    const { data } = await api.post(`${baseUrl}/purposes`, body);
    return data;
}

export const editLoanPurpose = async (id: LoanPurpose["id"], body: LoanPurposeFormValues) => {
    await api.put(`${baseUrl}/purposes/${id}`, body);
}

export const editLoan = async (id: Loan["id"], body: LoanEditFormValues) => {
    await api.patch(`${baseUrl}/${id}`, body)
}

export const getLoanHistory = async (id: Loan["id"], params: ChangeLogQuery): Promise<ChangeHistory> => {
    const { data } = await api.get(`${baseUrl}/${id}/changes`, { params })
    return data;
}