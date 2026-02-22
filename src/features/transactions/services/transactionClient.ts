import { Query } from "@/components";
import api from "@/lib/services/api";
import { PagedResponse } from "@/models";
import { Transaction } from "../models/transaction";
import { TransactionFormValues } from "../lib/schemas/transactionFormSchema";
import { PaymentResult } from "../models/paymentResult";

const baseUrl = "transactions";

export const getTransactions = async (params: Query): Promise<PagedResponse<Transaction>> => {
    const { data } = await api.get(baseUrl, { params })
    return data;
}

export const createPayment = async ({ loanId, ...request }: TransactionFormValues): Promise<Transaction> => {
    const { data } = await api.post(baseUrl, { request, loanId, isPreview: true });
    return data;
}

export const getPaymentPreview = async ({ loanId, ...request }: TransactionFormValues): Promise<PaymentResult> => {
    const { data } = await api.post(baseUrl, { request, loanId, isPreview: true });
    return data;
}
