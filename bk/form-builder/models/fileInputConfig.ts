import { FileModel } from "@/models/fileModel";
import { FileAccept } from "../../../src/components/organisms/upload-form/models/fileAccept";
import { FileFormFieldValues } from "../../../src/components/organisms/upload-form/lib/form";


export interface FileInputConfig<TData> {
  initialFiles?: FileModel[];

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


  onUpload: (files: File[], data: Partial<TData>) => Promise<unknown>;
  onDelete?: (files: FileModel[], data: Partial<TData>) => Promise<void>;
  onCreate?: (fileData: FileFormFieldValues[], data: Partial<TData>) => Promise<void>;
  accept: FileAccept
}
