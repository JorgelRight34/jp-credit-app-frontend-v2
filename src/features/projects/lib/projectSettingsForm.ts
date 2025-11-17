import { z } from "zod";
import { Project } from "../models/project";
import { FormField } from "@/components";
import { COMPOUND_OPTIONS } from "@/utils/constants";

export const projectSettingsFormSchema = z.object({
  name: z.string().optional(),
  defaultPenaltyRate: z.union([
    z.string().transform((val) => Number(val)),
    z.number(),
  ]),
  graceDays: z.union([z.string().transform((val) => Number(val)), z.number()]),
});

export type ProjectSettingsFormValues = z.infer<
  typeof projectSettingsFormSchema
>;

const suffix = " (Por Defecto)";

export const projectSettingsFormFields: FormField<Project>[] = [
  {
    id: "defaultPenaltyRate",
    name: "defaultPenaltyRate",
    label: "Penalidad por Mora" + suffix,
    type: "percentage",
  },
  {
    id: "graceDays",
    name: "graceDays",
    label: "Dias de Gracia" + suffix,
    type: "number",
  },
  {
    id: "defaultCompound",
    name: "defaultCompound",
    label: "Capitalización" + suffix,
    options: COMPOUND_OPTIONS,
  },
];
