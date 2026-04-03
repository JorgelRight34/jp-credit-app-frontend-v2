import { ExportHandler, Query } from "@/components";
import api from "@/lib/services/api";
import { PagedResponse } from "@/models";
import { Transaction } from "../models/transaction";
import { PaymentFormValues } from "../lib/schemas/paymentFormSchema";
import { PaymentResult } from "../models/paymentResult";
import { DisbursementFormValues } from "../lib/schemas/disbursementFormSchema";
import { Disbursement } from "../models/disbursement";
import { AccountingPeriod, ClosedPeriod } from "../models/accountingPeriod";
import { ClosedPeriodFormValues } from "../lib/schemas/closePeriodFormSchema";
import { getReportByQueryKey, Report } from "@/features/reports";
import { TransactionType } from "../models/transactionType";
import { transactionReceiptReportKeyParts } from "../lib/constants";
import { withProjectIdParams } from "@/features/projects";
import { TransactionQuery } from "../models/transactionQuery";

const baseUrl = "transactions";

export const getTransactions = async (params: Query): Promise<PagedResponse<Transaction>> => {
    const { data } = await api.get(baseUrl, { params: withProjectIdParams(params) })
    return data;
}

export const getTransaction = async (id: Transaction["id"]): Promise<Transaction> => {
    const { data } = await api.get(baseUrl + "/" + id);
    return data;
}

export const getTransactionReceiptReport = async (type: TransactionType): Promise<Report> => {
    return getReportByQueryKey(transactionReceiptReportKeyParts.key, transactionReceiptReportKeyParts.buildSubkey(type))
}

export const getClosedPeriods = async (params: Query): Promise<PagedResponse<ClosedPeriod>> => {
    const { data } = await api.get(baseUrl + "/closed-periods", { params })
    return data
}

export const createPayment = async ({ loanId, ...request }: PaymentFormValues): Promise<Transaction> => {
    console.warn("create payment is on preview mode")
    const { data } = await api.post(baseUrl + "/payment", {
        request,
        loanId,
        isPreview: true // JUST FOR TESTING 
    });
    return data;
}

export const getCurrentAccountingPeriod = async (): Promise<AccountingPeriod> => {
    const { data } = await api.get(baseUrl + "/closed-periods/current");
    return data;
}

export const closePeriod = async (body: ClosedPeriodFormValues): Promise<ClosedPeriod> => {
    const { data } = await api.post(baseUrl + "/closed-periods", body)
    return data;
}

export const getPaymentPreview = async ({ loanId, ...request }: PaymentFormValues): Promise<PaymentResult> => {
    const { data } = await api.post(baseUrl + "/payment", { request, loanId, isPreview: true });
    return data;
}

export const createDisbursement = async ({ loanId, ...request }: DisbursementFormValues): Promise<Disbursement> => {
    const { data } = await api.post(baseUrl + "/disbursement", { request, loanId });
    return data;
}

export const deleteTransaction = async (id: Transaction["id"], type: Transaction["type"]) => {
    const endpoint = baseUrl

    if (type === "pc") {
        baseUrl + "/payments/"
    }
    else if (type === "ds") {
        baseUrl + "/disbursements/"
    }
    else {
        throw new Error("Type is invalid")
    }

    await api.delete(endpoint + id);
}

export const exportTransactions: ExportHandler<TransactionQuery> = async (options, params) => {
    const { data } = await api.get(baseUrl + "/export", {
        params: withProjectIdParams({ ...params, ...options }),
        responseType: "blob"
    })
    return data;
}