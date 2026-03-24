import { serverClient } from "@/lib/services/serverClient"
import { Loan } from "../models/loan"
import { LoanPurpose } from "../models/loanPurpose"

export const getLoanFromServer = async (id: Loan["id"]): Promise<Loan> => {
    return await serverClient.get("loans/" + id)
}

export const getLoanPurposeFromServer = async (id: LoanPurpose["id"]): Promise<LoanPurpose> => {
    return await serverClient.get("loans/purpouses" + id)
}