import { z } from "zod";
import {
  collateralAgreementTypeSpanishTranslations,
  collateralConditionSpanishTranslations,
  collateralStatusSpanishTranslations,
} from "./constants";
import { CollateralAgreementType } from "../models/collateralAgreementType";
import { SelectOptions } from "@/models";
import { toTitleCase } from "@/utils/utils";
import { FormProvider } from "@/components";
import { getLoanMembers, getLoanMembersSelectOptions } from "@/features/loans";

const generateOptions = (record: Record<string, string>) =>
  Object.keys(record)
    .map((key) => [
      key,
      toTitleCase(record[String(key) as keyof typeof record]) || "",
    ])
    .sort((a, b) => a[1].localeCompare(b[1])) as SelectOptions;

export const collateralStatusOptions = generateOptions(
  collateralStatusSpanishTranslations
);

export const collateralConditionsOptions = generateOptions(
  collateralConditionSpanishTranslations
);

export const collateralAgreementTypeOptions = generateOptions(
  collateralAgreementTypeSpanishTranslations
);

const collateralFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  value: z.union([z.string().transform((val) => Number(val)), z.number()]),
  condition: z.string(),
  status: z.string(),
  type: z.string(),
  location: z.string().optional(),
  expirationDate: z.string().optional(),
  ownerId: z.union([
    z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .transform((val) => val.value),
    z.string().transform((val) => Number(val)),
    z.number(),
  ]),
  loanId: z.union([z.string().transform((val) => Number(val)), z.number()]),
})


export const collateralFormProvider: FormProvider<CollateralFormValues> = {
  schema: collateralFormSchema,
  fields: [
    {
      name: "title",
      label: "Título",
      id: "title",
    },
    {
      name: "description",
      label: "Descripción",
      id: "description",
    },
    {
      name: "value",
      label: "Costo",
      type: "currency",
      id: "value",
    },

    {
      name: "status",
      label: "Estado",
      type: "select",
      options: collateralStatusOptions,
      id: "status",
    },
    {
      name: "type",
      label: "Tipo de Acuerdo",
      type: "select",
      options: collateralAgreementTypeOptions,
      id: "type",
    },
    {
      name: "condition",
      label: "Condición",
      type: "select",
      options: collateralConditionsOptions.map((option) => [
        option[0],
        option[1],
      ]),
      id: "condition",
    },
    {
      name: "location",
      label: "Locación",
      placeholder: "Santo Domingo...",
      watchedValues: ["type"],
      disabledWhen: ({ type }) => type !== CollateralAgreementType.Mortgage,
      required: false,
      id: "location",
    },
    {
      name: "expirationDate",
      label: "Expiración",
      type: "date",
      required: false,
      id: "expirationDate",
    },
    {
      name: "ownerId",
      label: "Dueño",
      type: "lazy-select",
      id: "ownerId",
      placeholder: "---",
      watchedValues: ["loanId"],
      showOnEdit: true,
      disabledWhen: ({ loanId }) => !loanId,
      loadOptions: async ({ loanId }) => {
        if (!loanId) return []

        const members = await getLoanMembers(loanId);

        return getLoanMembersSelectOptions(members)
      }
    },
    {
      name: "loanId",
      id: "loanId",
      label: "Préstamo",
      type: "loan",
      showOnEdit: false,
    },
  ]
}


export type CollateralFormValues = z.infer<typeof collateralFormSchema>;