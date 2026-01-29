import { z } from "zod";
import { TransactionType } from "../models/transactionType";
import { FormProvider } from "@/components";
import { getLoanMembersSelectOptions, loanClient } from "@/features/loans";

export const transactionTypesOptions: [TransactionType, string][] = [
  [TransactionType.DS, "DS | Desembolso"],
  [TransactionType.PC, "PC | Pago Cuota"],
];

const transactionFormSchema = z.object({
  value: z.string().transform((val) => Number(val)),
  type: z.string(),
  loanId: z.number(),
  payerId: z.union([
    z
      .object({ value: z.string(), label: z.string() })
      .transform((val) => val.value),
    z.string(),
  ]),
  date: z.string().default(new Date().toISOString()),
  penaltyRate: z.number().optional(),
  description: z.string().optional(),
  daysOfGrace: z.number().optional(),
})

export const transactionFormProvider: FormProvider<TransactionFormValues> = {
  schema: transactionFormSchema,
  fields: [
    {
      name: "value",
      id: "value",
      label: "Monto",
      type: "currency",
      disabledOnEdit: true
    },
    {
      name: "date",
      id: "date",
      label: "Fecha",
      type: "date",
      disabledOnEdit: true
    },
    {
      name: "loanId",
      id: "loanId",
      label: "Préstamo",
      type: "loan",
      disabledOnEdit: true
    },
    {
      name: "payerId",
      id: "payerId",
      label: "Emisor",
      type: "lazy-select",
      placeholder: "---",
      watchedValues: ["loanId"],
      disabledWhen: ({ loanId }) => !loanId,
      loadOptions: async ({ loanId }) => {
        if (!loanId) return []

        const members = await loanClient.getLoanMembers(loanId);

        return getLoanMembersSelectOptions(members)
      }
    },
    {
      name: "type",
      id: "type",
      label: "Tipo",
      type: "select",
      options: transactionTypesOptions,
      disabledOnEdit: true
    },
    {
      name: "penaltyRate",
      id: "penaltyRate",
      label: `Penalidad (1-100)% días de gracia)`,
      type: "percentage",
      step: 0.01,
      disabledOnEdit: true,
      watchedValues: ["type"],
      required: false,
      disabledWhen: ({ type }) => type === TransactionType.DS,
    },
    {
      name: "description",
      id: "description",
      type: "textarea",
      label: "Descripción",
      rows: 4,
    },
  ]
}

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;


const closedPeriodSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
})

export type ClosedPeriodFormValues = z.infer<typeof closedPeriodSchema>;

export const closedPeriodFormProvider: FormProvider<ClosedPeriodFormValues> = {
  schema: closedPeriodSchema,
  fields: [
    {
      id: "startDate",
      name: "startDate",
      label: "Fecha Inicio",
      type: "date"
    },
    {
      id: "endDate",
      name: "endDate",
      label: "Fecha Fin",
      type: "date"
    }
  ]
}