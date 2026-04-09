import { startTransition, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FileModel } from "@/models/fileModel";

export type FileUploads = {
  /** Files already stored in the backend */
  existing: Array<FileModel>;
  /** New files added in the UI (not persisted yet) */
  pending: Array<File>;
  /** Pending files removed before upload (undoable) */
  removedPending: Array<File>;
  /** Existing files marked for deletion */
  deletedExisting: Array<FileModel>;
};

export interface UseFileAttachmentsProps {
  filesMaxLength?: number;
  value: FileUploads;
  onChange: Dispatch<SetStateAction<FileUploads>>;
}

export type UseFileAttachmentsReturn = ReturnType<typeof useFileAttachments>;

const deleteMap: Partial<Record<keyof FileUploads, keyof FileUploads>> = {
  existing: "deletedExisting",
  pending: "removedPending",
};

export const useFileAttachments = (
  { filesMaxLength = 10, value: fileUploads, onChange }: UseFileAttachmentsProps,
  onDirtyChange?: (dirty: boolean) => void
) => {
  const reachedLimit = useMemo(
    () => fileUploads.pending.length + fileUploads.existing.length >= filesMaxLength,
    [fileUploads, filesMaxLength],
  );

  const markDirty = () => startTransition(() => {
    onDirtyChange?.(true);
  });

  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pendingFile = event.target.files?.[0];
    event.target.value = "";

    if (!pendingFile) return;

    if (fileUploads.pending.length >= filesMaxLength) {
      throw Error(`Solo ${filesMaxLength} archivos son permitidos.`);
    }

    onChange((prev) => ({
      ...prev,
      pending: [...prev.pending, pendingFile],
    }));

    markDirty();
  };

  const removeFile = (index: number, key: keyof FileUploads) =>
    moveFile(index, key, false);

  const recoverFile = (index: number, key: keyof FileUploads) =>
    moveFile(index, key, true);

  const moveFile = (index: number, key: keyof FileUploads, reverse = false) => {
    const target = deleteMap[key];
    if (!target) return;

    onChange((prev) => ({
      ...prev,
      [key]: reverse
        ? [...prev[key], prev[target][index]]
        : prev[key].filter((_, i) => i !== index),
      [target]: reverse
        ? prev[target].filter((_, i) => i !== index)
        : [...prev[target], prev[key][index]],
    }));

    markDirty();
  };

  return {
    add: {
      pendingFiles: fileUploads.pending,
      existingFiles: fileUploads.existing,
      addFile,
    },
    remove: {
      removedPendingFiles: fileUploads.removedPending,
      deletedExistingFiles: fileUploads.deletedExisting,
      removeFile,
      recoverFile,
    },
    reachedLimit,
    onChange,
  };
};
