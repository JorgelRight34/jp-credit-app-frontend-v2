import { Query, UseDataFormProps, useForm } from "@/components/organisms"
import { exportFormSchema, ExportFormValues } from "../lib/schemas/exportFormSchema";
import { AxiosResponse } from "axios";

export type ExportHandlerResponse = AxiosResponse<Blob>;

export type ExportHandler<T = Query> = (
    options: ExportFormValues,
    values: T,
) => Promise<ExportHandlerResponse>

interface UseExportFormProps extends UseDataFormProps<ExportHandlerResponse, ExportFormValues> {
    onSubmit: (
        options: ExportFormValues,
    ) => Promise<ExportHandlerResponse>
}

export const useExportForm = ({ onSubmit, ...config }: UseExportFormProps) => {
    return useForm({
        schema: exportFormSchema,
        defaultValues: { format: "pdf", initialPage: 1, endPage: 2, limit: 20 },
        onSubmit,
        ...config
    })
}