import { getLoanActorsSelectOptions } from "@/features/loans";
import { Transaction } from "../models/transaction";
import { SelectOptions, UseFormSetValue } from "@/components";
import { PaymentFormValues } from "./schemas/paymentFormSchema";

export const getPaymentLoanActorsSelectOptions = async (
    [loanId]: Array<string | number>, setValue: UseFormSetValue<PaymentFormValues>
): Promise<SelectOptions> => {
    const options = await getLoanActorsSelectOptions(
        loanId as number,
    )
    setValue('payerId', options[0][0] as number)

    return options
}

export const buildTransactionLabel = (transaction: Transaction) => `${transaction.type.toUpperCase()} - ${transaction.id}`