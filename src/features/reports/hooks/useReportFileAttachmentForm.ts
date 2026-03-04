import { useMemo, useRef } from "react";
import type { FileAttachmentsFormRef, UseDeferredFileAttachmentsFormReturn } from "@/components";
import { Report } from "../models/report";
import { deleteReportFiles, uploadReportFiles } from "../services/reportsClient";

export const useReportFileAttachmentForm = ({ report }: { report?: Report } = {}): UseDeferredFileAttachmentsFormReturn<Report> => {
    const reportRef = useRef(report);
    const formRef = useRef<FileAttachmentsFormRef>(null);

    const memoizedReportFiles = useMemo(() => report?.files, [report])

    return {
        form: {
            onUpload: (files) => uploadReportFiles(reportRef.current!.id, files),
            onDelete: (files) => deleteReportFiles(files.map(f => f.id)),
            initialFiles: memoizedReportFiles,
            accept: "*"
        },
        setRef: (value) => reportRef.current = value,
        submit: async (value) => {
            reportRef.current = value;
            await formRef.current?.submit();
        },
        handleSubmit: async () => formRef.current?.submit(),
        handleReset: () => formRef.current?.reset(),
        formRef
    }
}