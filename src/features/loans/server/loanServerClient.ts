import { serverClient } from "@/lib/services/serverClient"
import { Loan } from "../models/loan"

export const getLoanFromServer = async (id: number | string): Promise<Loan> => {
    return await serverClient.get("loans/" + id)
}