import {
  transactionFormProvider,
  TransactionFormValues
} from "../lib/form";
import { Transaction } from "../models/transaction";
import { TransactionType } from "../models/transactionType";
import { useMemo } from "react";
import { createTransaction } from "../services/transactionsClient";
import { toastService } from "@/lib/services";
import { transactionsCacheKey } from "../lib/constants";
import { UseEntityFormReturn, UseEntityModuleFormProps } from "@/components";
import { useCurrentProject } from "@/contexts/project-context";
import { getTodayFormattedDate } from "@/lib/utils";

type UseTransactionFormProps = UseEntityModuleFormProps<Transaction, TransactionFormValues>;

const useTransactionForm = ({ }: UseTransactionFormProps = {}): UseEntityFormReturn<Transaction, TransactionFormValues> => {
  const { project } = useCurrentProject();

  const defaultValues = useMemo(
    () => ({
      penaltyRate: project?.defaultPenaltyRate ?? 0,
      daysOfGrace: project?.graceDays ?? 0,
      type: TransactionType.PC,
      date: getTodayFormattedDate(),
    }),
    [project]
  );

  const handleOnSubmit = async (data: TransactionFormValues) => {
    const transaction = await createTransaction(data);
    toastService.success("¡La transacción se ha creado exitosamente!");

    return transaction;
  };

  return {
    onSubmit: handleOnSubmit,
    config: {
      formProvider: transactionFormProvider,
      cacheKeysToInvalidate: [transactionsCacheKey],
      tagsToInvalidate: [],
      defaultValues,
    },
  };
};

export default useTransactionForm;
