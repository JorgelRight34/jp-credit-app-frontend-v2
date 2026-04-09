import { useDataFileAttachmentsForm } from "@/components";
import { Report } from "../models/report";
import { reporstQueryKey } from "../lib/query-keys";
import { DeleteFilesHandler, UploadFilesHandler } from "../models/handlers";

interface UseReportFileAttachmentFormProps {
    report?: Report;
    onUpload: UploadFilesHandler;
    onDelete: DeleteFilesHandler
}

export const useReportFileAttachmentForm = ({ report, onUpload, onDelete }: UseReportFileAttachmentFormProps) => {
    return useDataFileAttachmentsForm({
        entity: report,
        getFiles: (r) => r?.documents,
        formConfig: (ref) => ({
            onUpload: (files) => onUpload(ref.current!.id, files),
            onDelete: (files) => onDelete(ref.current!.id, files.map(f => f.publicId!)),
            keysToInvalidate: [[reporstQueryKey]],
            accept: ".txt,.doc,.docx,.pdf,.rtf,.odt,.md,.csv,.json,.xml,.html,.htm",
        }),
    });
}