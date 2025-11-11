import { UseFileFormProps } from "@/components/FileUpload/hooks/useUploadFileForm";
import { useMemo } from "react";
import { uploadReport } from "../services/reportsClient";
import { FormBuilderRef } from "@/components/EntityForm/models/formBuilder";
import { ReportFormFields } from "../lib/form";
import { Report } from "../models/report";
import { createFile } from "@/components/FileUpload/services/fileUploadClient";

interface UseReportFileForm {
    form: FormBuilderRef<ReportFormFields> | null;
    edit?: Report;
}

export const useReportFileForm = ({ edit, form }: UseReportFileForm): UseFileFormProps => {
    const memoizedEditFiles = useMemo(
        () => (edit ? [edit?.document] : undefined),
        [edit],
    );

    return {
        onUpload: async (files) => {
            if (!form?.validate()) return;

            const response = await uploadReport(files[0]);
            form?.setValue("documentId", response.id!);
            form?.submit();
        },
        onCreate: async (files) => {
            if (!form?.validate()) return;

            const response = await createFile(files[0]);
            form?.setValue("documentId", response.id!);
            form?.submit();
        },
        editFiles: memoizedEditFiles,
        filesMaxLength: 1,
        accept: "*/*",
    }
}