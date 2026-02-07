import type { Loan } from "../models/loan"
import type { LoanQuery } from "../models/loanQuery"
import type { PagedResponse } from "@/models"
import api from "@/lib/services/api"

const baseUrl = "loans"

export const getLoans = async (params: LoanQuery): Promise<PagedResponse<Loan>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const getLoan = async (id: Loan["id"]) => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}