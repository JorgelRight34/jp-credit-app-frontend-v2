import { startTransition, useState } from "react";
import type { FileUploads } from "./useFileAttachments";
import type { FileAccept } from "../models/fileAccept";
import type { FileModel } from "@/models/fileModel";
import type { FileFormFieldValues } from "../lib/form";
import { useDataMutation } from "@/hooks/useMutate";
import { CacheKey } from "@/models";
import { useDataClient } from "@/hooks/useDataClient";

export type UseFileAttachmentsFormProps = {
    initialFiles?: Array<FileModel>;
    filesMaxLength?: number;
    accept: FileAccept;
    keysToInvalidate: Array<CacheKey>;
    resetValues?: boolean;
    onUpload: (files: Array<File>) => Promise<unknown>;
    onDelete?: (files: Array<FileModel>) => Promise<void>;
    onCreate?: (fileData: Array<FileFormFieldValues>) => Promise<void>;
};

export const useFileAttachmentsForm = ({
    resetValues,
    initialFiles,
    filesMaxLength,
    keysToInvalidate,
    onUpload,
    onDelete,
}: UseFileAttachmentsFormProps) => {
    const [fileUploads, setFileUploads] = useState<FileUploads>({
        existing: initialFiles ?? [],
        pending: [],
        removedPending: [],
        deletedExisting: [],
    });

    const handleSubmit = async () => {
        await Promise.all([processUploads(), processDeletions()]);
        startTransition(() => setFileUploads((prev) => ({ ...prev, deletedExisting: [] })))
    };

    const dataClient = useDataClient();
    const { mutateAsync, isPending } = useDataMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            if (resetValues) init();

            for (const key of keysToInvalidate) {
                dataClient.invalidate({ key })
            }
        }
    });

    const processUploads = async () => {
        const filesToUpload = fileUploads.pending;
        if (filesToUpload.length === 0) return;

        await onUpload(filesToUpload);
    };

    const processDeletions = async () => {
        if (!onDelete) return;

        const filesToDelete = fileUploads.deletedExisting;
        if (filesToDelete.length === 0) return;

        await onDelete(filesToDelete);
    };

    const init = () => {
        startTransition(() => {
            setFileUploads({
                pending: [],
                removedPending: [],
                deletedExisting: [],
                existing: initialFiles ?? [],
            });
        })
    };

    return {
        value: fileUploads,
        filesMaxLength,
        isPending,
        onSubmit: mutateAsync,
        onChange: setFileUploads,
        reset: init,
    };
};
