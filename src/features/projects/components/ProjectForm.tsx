import { EntityForm, EntityFormProps } from "@/components";
import { useProjectForm } from "../hooks/useProjectForm";
import { ProjectFormValues } from "../lib/projectForm";
import { Project } from "../models/project";

type ProjectFormProps = EntityFormProps<ProjectFormValues, Project>;

const ProjectForm = ({ edit }: ProjectFormProps) => {
  const methods = useProjectForm({
    edit,
  });

  return <EntityForm edit={edit} {...methods} />;
};

export default ProjectForm;
