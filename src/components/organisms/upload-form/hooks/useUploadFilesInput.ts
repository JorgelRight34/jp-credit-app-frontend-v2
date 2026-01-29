import { useMemo, useState } from "react";
import type { FileFormFieldValues } from "../lib/form";
import type { UseMultipleFilesInputProps, UseUploadFilesInputReturn } from "../models/useMultipleFilesInputProp";
import type { FileModel } from "@/models/fileModel";

export type FileUploads = {
  /* These are the initial files returned from the api, these represent the database model of the already uploaded file */
  loaded: Array<FileModel>
  /* These are files uploaded via the form as File objects */
  uploaded: Array<File>;
  /* These are the files created via a form to create the database model from scratch */
  created: Array<FileFormFieldValues>,
  /* Represents the removed created files */
  removedCreations: Array<FileFormFieldValues>,
  /* Represents the removed uploaded files */
  removed: Array<File>,
  /* Representes the deleted loaded files */
  deleted: Array<FileModel>;
}

const deleteMap: Partial<Record<keyof FileUploads, keyof FileUploads>> = {
  loaded: "deleted",
  uploaded: "removed",
  created: "removedCreations"
};


export const useUploadFilesInput = ({ filesMaxLength = 10, value: fileUploads, onChange }
  : UseMultipleFilesInputProps): UseUploadFilesInputReturn => {
  const [isDirty, setIsDirty] = useState(false);

  const reachedLimit = useMemo(
    () => fileUploads.uploaded.length >= filesMaxLength,
    [fileUploads, filesMaxLength]);

  const markDirty = () => setIsDirty(true);

  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    event.target.value = "";

    if (!uploadedFile) return;

    if (fileUploads.uploaded.length >= filesMaxLength) {
      throw Error(`Solo ${filesMaxLength} archivos son permitidos.`);
    }

    onChange(prev => ({
      ...prev,
      uploaded: [...prev.uploaded, uploadedFile]
    }))

    markDirty();
  };

  const removeFile = (index: number, key: keyof FileUploads) =>
    moveFile(index, key, false);

  const recoverFile = (index: number, key: keyof FileUploads) =>
    moveFile(index, key, true);

  const moveFile = (index: number, key: keyof FileUploads, reverse = false) => {
    const target = deleteMap[key];
    if (!target) return;

    onChange(prev => ({
      ...prev,
      [key]: reverse ? [...prev[key], prev[target][index]]
        : prev[key].filter((_, i) => i !== index),
      [target]: reverse ? prev[target].filter((_, i) => i !== index)
        : [...prev[target], prev[key][index]],
    }));

    markDirty();
  };

  return {
    upload: {
      uploaded: fileUploads.uploaded,
      created: fileUploads.created,
      loaded: fileUploads.loaded,
      addFile,
    },
    remove: {
      removedFiles: fileUploads.removed,
      deleted: fileUploads.deleted,
      removedCreations: fileUploads.removedCreations,
      removeFile,
      recoverFile,
    },
    isDirty,
    reachedLimit,
    onChange,
  };
};

