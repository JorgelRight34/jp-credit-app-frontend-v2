import { ApiFile } from "@/models/apiFile";
import { FileAccept } from "@/components/FileUpload/models/fileAccept";
import { FileFormFieldValues } from "@/components/FileUpload/lib/form";


/**
 * Configuration for a file input component, supporting both new uploads and existing file sources.
 */
export interface FileInputConfig<TData> {
  // ─────────────────────────────────────────────
  // 🔹 New File Uploads
  // ─────────────────────────────────────────────

  editFiles?: ApiFile[];

  /**
   * Function to update the selected files.
   * Can accept a new array or a function to update the previous state.
   */
  setFiles?: (files: File[] | ((prev: File[]) => File[])) => void;

  /**
   * Maximum number of files allowed to be uploaded.
   */
  filesMaxLength?: number;

  /**
   * Flag used to manually reset a multi-file input form.
   * Useful when the component needs to re-render or clear its state after submition.
   */
  resetMultipleFileFormFlag?: boolean;

  // ─────────────────────────────────────────────
  // 🔹 Existing Files (e.g., from API)
  // ─────────────────────────────────────────────

  /**
   * List of files previously uploaded and retrieved from an API.
   * These are shown as already-attached files.
   */
  defaultFileSources?: ApiFile[];

  onUpload: (files: File[], data: Partial<TData>) => Promise<unknown>;
  onDelete?: (files: ApiFile[], data: Partial<TData>) => Promise<void>;
  onCreate?: (fileData: FileFormFieldValues[], data: Partial<TData>) => Promise<void>;
  accept: FileAccept
}
