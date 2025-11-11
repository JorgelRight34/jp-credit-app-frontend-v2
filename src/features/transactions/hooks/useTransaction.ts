
import { Transaction } from "../models/transaction";
import { transactionsCacheKey } from "../lib/constants";
import { getTransaction } from "../services/transactionsClient";
import { useData } from "@/hooks/useData";

interface UseTransactionProps {
    id?: number | string;
}

export const useTransaction = ({ id }: UseTransactionProps) => {
    const numericId = Number(id);
    const { data, isError, isLoading } = useData<Transaction>({
        key: [...transactionsCacheKey, numericId],
        getData: () => getTransaction(numericId),
        enabled: !!numericId,
    });
    return { transaction: data, isError, isLoading };
};
