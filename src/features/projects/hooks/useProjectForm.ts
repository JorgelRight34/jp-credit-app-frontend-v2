import { UseEntityFormReturn } from "../../../components/EntityForm/models/useEntityFormReturn";
import {
  projectFormFields,
  ProjectFormValues,
  schema,
} from "../lib/projectForm";
import {
  projectSettingsFormFields,
  projectSettingsFormSchema,
} from "../lib/projectSettingsForm";
import { Project } from "../models/project";
import useEditProject from "./useEditProject";
import useNewProject from "./useNewProject";

interface UseProjectFormProps {
  edit?: Project;
}

const useProjectForm = ({
  edit,
}: UseProjectFormProps): UseEntityFormReturn<Project, ProjectFormValues> => {
  const { createProject } = useNewProject();
  const { editProject } = useEditProject();

  const handleOnSubmit = async (data: ProjectFormValues) => {
    await (edit ? editProject({ data, id: edit.id }) : createProject(data));
  };

  return {
    handleOnSubmit,
    formConfig: {
      formFields: edit ? projectSettingsFormFields : projectFormFields,
      schema: edit ? projectSettingsFormSchema : schema,
      defaultValues: edit ? { ...edit } : undefined,
      resetValues: !edit,
    },
  };
};

export default useProjectForm;
