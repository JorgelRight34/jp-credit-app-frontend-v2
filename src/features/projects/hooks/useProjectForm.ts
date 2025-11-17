import { UseEntityFormReturn } from "@/components";
import {
  projectFormProvider,
  ProjectFormValues,
} from "../lib/projectForm";
import { Project } from "../models/project";
import { projectsClient } from "../services/projectService";
import { projectsTag } from "../lib/constants";

interface UseProjectFormProps {
  edit?: Project;
}

export const useProjectForm = ({
  edit
}: UseProjectFormProps): UseEntityFormReturn<Project, ProjectFormValues> => {
  const onSubmit = async (data: ProjectFormValues) => {
    return await projectsClient.createProject(data);
  }

  const onEdit = async (data: ProjectFormValues) => {
    return await projectsClient.editProject(data, edit!.id)
  }

  return {
    onSubmit,
    onEdit,
    config: {
      formProvider: projectFormProvider,
      defaultValues: edit,
      resetValues: !edit,
      tagsToInvalidate: [projectsTag],
      cacheKeysToInvalidate: []
    },
  };
};