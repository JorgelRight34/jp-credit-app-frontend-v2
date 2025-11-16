import { FileModel } from "@/models/fileModel";
import { UseEntityModuleFormProps } from "../../form-builder/models/formBuilder";
import { useFileForm, UseFileFormProps } from "../hooks/useFileForm";

import { FileFormFieldValues } from "../lib/form";
import { EntityForm } from "../../form-builder";

export type FileFormProps = UseEntityModuleFormProps<
  FileModel,
  FileFormFieldValues
> &
  UseFileFormProps;

const FileForm = ({ onSubmit, ...props }: FileFormProps) => {
  const config = useFileForm({ onSubmit });

  return <EntityForm layout={[["name"], ["url"]]} {...props} {...config} />;
};

export default FileForm;
