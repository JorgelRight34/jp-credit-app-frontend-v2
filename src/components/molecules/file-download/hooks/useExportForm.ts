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

export const useExportForm = ({ onSubmit, ...config }: UseExportFormProps) => {
    return useForm({
        schema: exportFormSchema,
        defaultValues: { format: "pdf", initialPage: 1, endPage: 2, limit: 20 },
        onSubmit,
        ...config
    })
}