import {
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useEffect,
  useImperativeHandle,
} from "react";
import { FormBuilderRef } from "@/components/EntityForm/models/formBuilder";
import { UseUploadFilesInputReturn } from "../models/useMultipleFilesInputProp";
import { FileUploads, useUploadFilesInput } from "../hooks/useUploadFilesInput";
import {
  UseFileFormProps,
  useUploadFileForm,
} from "../hooks/useUploadFileForm";

export interface FileFormProps extends UseFileFormProps {
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
      submit: () => {},
      reset,
      setValue: () => {},
      onChange: config.onChange,
      validate: () => true,
      isDirty,
    }));

    return render({ isDirty, ...methods });
  },
);

export default UploadFileForm;
