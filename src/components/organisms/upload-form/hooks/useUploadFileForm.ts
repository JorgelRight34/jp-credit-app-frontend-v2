import { useCallback, useEffect, useState } from "react";
import { FileInputConfig } from "@/components/EntityForm";
import { useDataMutation } from "@/hooks/useMutate";
import { FileUploads } from "./useUploadFilesInput";

export type UseFileFormProps<T = object> = FileInputConfig<T> & {
    defaultData?: T;
};

export const useUploadFileForm = <T = object>(
    { onUpload, onDelete, onCreate, defaultData, editFiles, filesMaxLength }: UseFileFormProps<T>
) => {
    const [fileUploads, setFileUploads] = useState<FileUploads>({
        loaded: [],
        uploaded: [],
        created: [],
        removed: [],
        deleted: [],
        removedCreations: []
    })
    const [isDirty, setIsDirty] = useState(false);

    const handleSubmit = async (data?: T) => {
        const response = data ?? defaultData ?? {} as T;

        await Promise.all([
            processUploads(response),
            processDeletions(response),
            processCreations(response)
        ])

        setFileUploads(prev => ({ ...prev, deleted: [] }))
    }

    const { mutateAsync, isPending } = useDataMutation({
        mutationFn: handleSubmit
    })


    const processUploads = async (response: T) => {
        if (!onUpload) return;

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

    const init = useCallback(() => {
        setFileUploads({
            uploaded: [],
            removed: [],
            created: [],
            deleted: [],
            loaded: editFiles ?? [],
            removedCreations: []
        })
    }, [editFiles])

    useEffect(() => {
        if (editFiles) {
            init()
        }
    }, [editFiles, init])

    return {
        value: fileUploads,
        filesMaxLength,
        isPending,
        isDirty,
        onDirtyChange: setIsDirty,
        onSubmit: (data?: T) => mutateAsync(data),
        onChange: setFileUploads,
        reset: init
    }
}