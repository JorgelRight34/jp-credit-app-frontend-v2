import { useState } from "react";
import type { FileUploads } from "./useUploadFilesInput";
import type { FileAccept } from "../models/fileAccept";
import type { FileModel } from "@/models/fileModel";
import type { FileFormFieldValues } from "../lib/form";
import { useDataMutation } from "@/hooks/useMutate";

export type UseUploadFileFormProps<T = object> = {
    initialFiles?: Array<FileModel>;
    filesMaxLength?: number;
    accept: FileAccept
    defaultData?: T;
    onUpload: (files: Array<File>, data: Partial<T>) => Promise<unknown>;
    onDelete?: (files: Array<FileModel>, data: Partial<T>) => Promise<void>;
    onCreate?: (fileData: Array<FileFormFieldValues>, data: Partial<T>) => Promise<void>;
};

export const useUploadFileForm = <T = object>(
    { initialFiles, filesMaxLength, onUpload, onDelete, onCreate }: UseUploadFileFormProps<T>
) => {
    const [fileUploads, setFileUploads] = useState<FileUploads>({
        loaded: initialFiles ?? [],
        uploaded: [],
        created: [],
        removed: [],
        deleted: [],
        removedCreations: []
    })
    const [isDirty, setIsDirty] = useState(false);

    const handleSubmit = async (data: T) => {
        await Promise.all([
            processUploads(data),
            processDeletions(data),
            processCreations(data)
        ])

        setFileUploads(prev => ({ ...prev, deleted: [] }))
    }

    const { mutateAsync, isPending } = useDataMutation({
        mutationFn: handleSubmit
    })

    const processUploads = async (response: T) => {
        const filesToUpload = fileUploads.uploaded;
        if (filesToUpload.length === 0) return;

        await onUpload(filesToUpload, response);
    };

    const processDeletions = async (response: T) => {
        if (!onDelete) return;

        const filesToDelete = fileUploads.deleted;

        if (filesToDelete.length === 0) return;

        await onDelete(filesToDelete, response);
    };

    const processCreations = async (response: T) => {
        if (!onCreate) return;

        const filesToCreate = fileUploads.created;
        if (filesToCreate.length === 0) return;

        await onCreate(filesToCreate, response);
    }

    const init = () => {
        setFileUploads({
            uploaded: [],
            removed: [],
            created: [],
            deleted: [],
            loaded: initialFiles ?? [],
            removedCreations: []
        })
    }

    return {
        value: fileUploads,
        filesMaxLength,
        isPending,
        isDirty,
        onDirtyChange: setIsDirty,
        onSubmit: mutateAsync,
        onChange: setFileUploads,
        reset: init
    }
}