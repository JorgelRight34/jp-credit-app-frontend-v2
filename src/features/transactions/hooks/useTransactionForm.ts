import {
  transactionFormProvider,
  TransactionFormValues
} from "../lib/form";
import { Transaction } from "../models/transaction";
import { TransactionType } from "../models/transactionType";
import { useMemo } from "react";
import { useCurrentProject } from "../../../contexts/ProjectContext";
import { UseEntityModuleFormProps } from "@/components/EntityForm/models/UseEntityModuleFormProps";
import { createTransaction } from "../services/transactionsClient";
import { toastService } from "@/services";
import { UseEntityFormReturn } from "@/models";
import { getTodayFormattedDate } from "@/utils/utils";
import { transactionsCacheKey } from "../lib/constants";

type UseTransactionFormProps = UseEntityModuleFormProps<Transaction, TransactionFormValues>;

// eslint-disable-next-line no-empty-pattern
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
      defaultValues,
    },
  };
};

export default useTransactionForm;
