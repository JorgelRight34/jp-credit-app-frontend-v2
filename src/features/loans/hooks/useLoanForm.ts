import { useCurrentProject } from "@/contexts/ProjectContext";
import { loanFormProvider, LoanFormValues } from "../lib/form";
import { Loan } from "../models/loan";
import { UseEntityFormReturn } from "@/models";
import { useMemo } from "react";
import { toastService } from "@/services";
import { createLoan, editLoan } from "../services/loanClient";
import { loansQueryKey } from "../lib/constants";

interface UseLoanFormProps {
  edit?: Loan;
}

const useLoanForm = ({
  edit,
}: UseLoanFormProps): UseEntityFormReturn<Loan, LoanFormValues> => {
  const { project } = useCurrentProject();

  const defaultValues = useMemo<Partial<LoanFormValues>>(() => {
    const projectId = project?.id;;

    if (edit) {
      return {
        ...edit,
        paymentFrequency: edit.paymentFrequency ?? 12,
        numberOfPayments: edit.numberOfPayments ?? 1,
        projectId: project?.id,
        interestRate: edit.annualInterestRate,
      }
    }

    return { projectId, paymentFrequency: 12, numberOfPayments: 1 }
  }, [edit, project]);


  const handleOnSubmit = async (data: LoanFormValues): Promise<Loan> => {
    const response = await createLoan(data);
    toastService.success(`El préstamo ha sido guardado exitosamente.`)

    return response;
  };

  const handleOnEdit = async (data: LoanFormValues) => {
    await editLoan(edit!.id!, data);
    toastService.success(`El préstamo ha sido guardado exitosamente.`);

    return edit!;
  }

  return {
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    config: {
      formProvider: loanFormProvider,
      resetValues: !edit,
      cacheKeysToInvalidate: [loansQueryKey],
      defaultValues
    },
  };
};

export default useLoanForm;
