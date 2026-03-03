import { Query, UseDataFormProps, useForm } from "@/components/organisms"
import { exportFormSchema, ExportFormValues } from "../lib/schemas/exportFormSchema";

export type ExportHandler<T = Query> = (
    options: ExportFormValues,
    values: T,
) => Promise<Blob>

interface UseExportFormProps extends UseDataFormProps<Blob, ExportFormValues> {
    onSubmit: (
        options: ExportFormValues,
    ) => Promise<Blob>
}

export const useExportForm = ({ onSubmit }: UseExportFormProps) => {
    return useForm({
        schema: exportFormSchema,
        defaultValues: { format: "pdf", pageStart: 1, pageEnd: 2, limit: 20 },
        onSubmit,
    })
}