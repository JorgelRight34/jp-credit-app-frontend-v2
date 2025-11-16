import {
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useEffect,
  useImperativeHandle,
} from "react";
import { UseUploadFilesInputReturn } from "../models/useMultipleFilesInputProp";
import { FileUploads, useUploadFilesInput } from "../hooks/useUploadFilesInput";
import {
  UseUploadFileFormProps,
  useUploadFileForm,
} from "../hooks/useUploadFileForm";
import { FormBuilderRef } from "../../form-builder/models/formBuilder";

export interface FileFormProps extends UseUploadFileFormProps {
  resetFlag?: boolean;
  render: (methods: UseUploadFilesInputReturn) => ReactNode;
  onDirtyChange?: (isDirty: boolean) => void;
}

export type UploadFileFormRef = Omit<FormBuilderRef, "control" | "onChange"> & {
  onChange: Dispatch<SetStateAction<FileUploads>>;
};

const UploadFileForm = forwardRef(
  (
    { onDirtyChange, render, ...params }: FileFormProps,
    ref: React.Ref<UploadFileFormRef>,
  ) => {
    const { reset, ...config } = useUploadFileForm(params);
    const { isDirty, ...methods } = useUploadFilesInput(config);

    useEffect(() => {
      onDirtyChange?.(isDirty);
    }, [isDirty, onDirtyChange]);

    useImperativeHandle(ref, () => ({
      isDirty,
      reset,
      onChange: config.onChange,
      submit: () => {},
      validate: () => true,
      setValue: () => {},
    }));

    return render({ isDirty, ...methods });
  },
);

UploadFileForm.displayName = "UploadFileForm";

export default UploadFileForm;
