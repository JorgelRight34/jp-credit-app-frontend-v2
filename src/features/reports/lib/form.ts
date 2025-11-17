import { z } from "zod";
import { ReportKey } from "../models/reportKey";
import { FormProvider } from "@/components";

const reportsFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    documentId: z.number(),
    key: z.string(),
})


export const reportsFormProvider: FormProvider<ReportFormFields> = {
    schema: reportsFormSchema,
    fields: [
        {
            name: "title",
            id: "title",
            label: "Título"
        },
        {
            label: "Descripción",
            id: "description",
            name: "description",
            type: "textarea",
            rows: 3
        },
        {
            name: "key",
            id: "key",
            label: "Categoría",
            type: "select",
            options: [
                ["loan", "Préstamo"],
                ["collateral", "Garantía"],
                ["note", "Nota de Ajuste"],
                ["profile", "Pérfil"],
                ["transaction", "Transacción"]
            ] as [ReportKey, string][]
        },
    ]
}
export type ReportFormFields = z.infer<typeof reportsFormSchema>;


const reportsRunFormSchema = z.object({
    id: z.number(),
    key: z.union([z.number(), z.string().transform(el => Number(el))]),
    context: z.any(),
})

export const reportsRunFormProvider: FormProvider<ReportRunFormFields> = {
    schema: reportsRunFormSchema,
    fields: []
}
export type ReportRunFormFields = z.infer<typeof reportsRunFormSchema>;
