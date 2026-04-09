import { useMemo, useRef, type RefObject } from "react";
import type { FileAttachmentsFormRef } from "../components/file-attachments-form";
import type { UseFileAttachmentsFormProps } from "../hooks/useFileAttachmentsForm";
import { FileModel } from "@/models/fileModel";

export type UseDeferredFileAttachmentsFormReturn<TRef> = {
    form: UseFileAttachmentsFormProps;
    setRef: (value: TRef | undefined) => void;
    submit: (value: TRef | undefined) => Promise<unknown>;
    handleSubmit: () => Promise<unknown>;
    handleReset: () => void;
    formRef: RefObject<FileAttachmentsFormRef | null>;
}

interface UseFileAttachmentsFormOptions<T extends { id: number }> {
    entity?: T;
    getFiles: (entity?: T) => Array<FileModel> | undefined;
    formConfig: (entityRef: RefObject<T | undefined>) => UseFileAttachmentsFormProps;
}

export const useDataFileAttachmentsForm = <T extends { id: number }>({
    entity,
    getFiles,
    formConfig,
}: UseFileAttachmentsFormOptions<T>): UseDeferredFileAttachmentsFormReturn<T> => {
    const entityRef = useRef<T | undefined>(entity);
    const formRef = useRef<FileAttachmentsFormRef>(null);

    const initialFiles = useMemo(() => getFiles(entity), [entity]);

    return {
        form: {
            ...formConfig(entityRef),
            resetValues: entity ? false : true,
            initialFiles,
        },
        setRef: (value: T | undefined) => entityRef.current = value,
        submit: async (value: T | undefined) => {
            entityRef.current = value;
            await formRef.current?.submit();
        },
        handleSubmit: async () => formRef.current?.submit(),
        handleReset: () => formRef.current?.reset(),
        formRef,
    };
};