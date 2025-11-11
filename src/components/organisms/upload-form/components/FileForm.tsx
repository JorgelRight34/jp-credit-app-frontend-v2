import { EntityForm } from "@/components/EntityForm";
import { useFileForm, UseFileFormProps } from "../hooks/useFileForm";
import { UseEntityModuleFormProps } from "@/components/EntityForm/models/UseEntityModuleFormProps";
import { ApiFile } from "@/models";
import { FileFormFieldValues } from "../lib/form";

export type FileFormProps = UseEntityModuleFormProps<
  ApiFile,
  FileFormFieldValues
> &
  UseFileFormProps;

const FileForm = ({ onSubmit, ...props }: FileFormProps) => {
  const config = useFileForm({ onSubmit });

  return <EntityForm layout={[["name"], ["url"]]} {...props} {...config} />;
};

export default FileForm;
