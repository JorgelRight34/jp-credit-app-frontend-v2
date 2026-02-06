import type { RefObject } from "react";
import type { FileAttachmentsFormRef } from "../components/file-attachments-form";
import type { UseFileAttachmentsFormProps } from "../hooks/useFileAttachmentsForm";

export type UseDeferredFileAttachmentsFormReturn<TRef> = {
    form: UseFileAttachmentsFormProps;
    setRef: (value: TRef | undefined) => void;
    submit: (value: TRef | undefined) => Promise<unknown>;
    formRef: RefObject<FileAttachmentsFormRef | null>;
}