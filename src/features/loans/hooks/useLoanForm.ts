import { useCurrentProject } from "@/contexts/ProjectContext";
import { loanFormSchema, LoanFormValues } from "../lib/form";
import { Loan } from "../models/loan";
import { useMemo } from "react";
import { toastService } from "@/services";
import { createLoan, editLoan } from "../services/loanClient";
import { loansQueryKey, loansTag } from "../lib/constants";
import { UseEntityModuleFormProps, useFormBuilder } from "@/components";

type UseLoanFormProps = UseEntityModuleFormProps<Loan, LoanFormValues>

const useLoanForm = ({
  edit, defaultValues: initialDefValues, ...props
}: UseLoanFormProps) => {
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

    return { projectId, paymentFrequency: 12, numberOfPayments: 1, ...initialDefValues }
  }, [edit, initialDefValues, project?.id]);


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

  return useFormBuilder({
    onSubmit: handleOnSubmit,
    onEdit: handleOnEdit,
    edit: !!edit,
    cacheKeysToInvalidate: [loansQueryKey],
    tagsToInvalidate: [loansTag],
    schema: loanFormSchema,
    resetValues: !edit,
    defaultValues,
    ...props
  });
};

export default useLoanForm;
