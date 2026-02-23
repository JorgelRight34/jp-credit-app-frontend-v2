import { getLoanActorsSelectOptions } from "@/features/loans";
import { Transaction } from "../models/transaction";
import { SelectOptions, UseFormSetValue } from "@/components";
import { TransactionFormValues } from "./schemas/transactionFormSchema";

export const getTransactionLabel = (transaction: Transaction) => `${transaction.type.toUpperCase()}-${transaction.id}`

export const getTransactionLoanActorsSelectOptions = async (
    [loanId]: Array<string | number>, setValue: UseFormSetValue<TransactionFormValues>
): Promise<SelectOptions> => {
    const options = await getLoanActorsSelectOptions(
        loanId as number,
    )
    setValue('payerId', options[0][0] as number)

    return options
}