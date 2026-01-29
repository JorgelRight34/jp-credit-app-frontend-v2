import { useMemo } from "react";
import { uploadReport } from "../services/reportsClient";
import { ReportFormFields } from "../lib/form";
import { Report } from "../models/report";
import { FormBuilderRef } from "bk/form-builder/models/formBuilder";
import { createFile, UseUploadFileFormProps } from "@/components";

interface UseReportFileForm {
    form: FormBuilderRef<ReportFormFields> | null;
    edit?: Report;
}

export const useReportFileForm = ({ edit, form }: UseReportFileForm): UseUploadFileFormProps<Report> => {
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
        initialFiles: memoizedEditFiles,
        filesMaxLength: 1,
        accept: "*/*",
    }
}