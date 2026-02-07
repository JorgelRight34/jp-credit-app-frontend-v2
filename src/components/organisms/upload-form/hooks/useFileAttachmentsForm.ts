import { useState } from "react";
import type { FileUploads } from "./useFileAttachments";
import type { FileAccept } from "../models/fileAccept";
import type { FileModel } from "@/models/fileModel";
import type { FileFormFieldValues } from "../lib/form";
import { useDataMutation } from "@/hooks/useMutate";

export type UseFileAttachmentsFormProps = {
    initialFiles?: Array<FileModel>;
    filesMaxLength?: number;
    accept: FileAccept;
    onUpload: (files: Array<File>) => Promise<unknown>;
    onDelete?: (files: Array<FileModel>) => Promise<void>;
    onCreate?: (fileData: Array<FileFormFieldValues>) => Promise<void>;
};

export const useFileAttachmentsForm = ({
    initialFiles,
    filesMaxLength,
    onUpload,
    onDelete,
}: UseFileAttachmentsFormProps) => {
    const [fileUploads, setFileUploads] = useState<FileUploads>({
        existing: initialFiles ?? [],
        pending: [],
        removedPending: [],
        deletedExisting: [],
    });

    const [isDirty, setIsDirty] = useState(false);

    const handleSubmit = async () => {
        await Promise.all([processUploads(), processDeletions()]);

        setFileUploads((prev) => ({ ...prev, deletedExisting: [] }));
    };

    const { mutateAsync, isPending } = useDataMutation({
        mutationFn: handleSubmit,
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
        setFileUploads({
            pending: [],
            removedPending: [],
            deletedExisting: [],
            existing: initialFiles ?? [],
        });
    };

    return {
        value: fileUploads,
        filesMaxLength,
        isPending,
        isDirty,
        onDirtyChange: setIsDirty,
        onSubmit: mutateAsync,
        onChange: setFileUploads,
        reset: init,
    };
};
