import EntityForm from "../../../components/EntityForm/components/EntityForm";
import { EntityFormProps } from "../../../components/EntityForm/models/entityFormProps";
import useProjectForm from "../hooks/useProjectForm";
import { ProjectFormValues } from "../lib/projectForm";
import { Project } from "../models/project";

interface ProjectFormProps extends EntityFormProps {
  edit?: Project;
}

const ProjectForm = ({ edit }: ProjectFormProps) => {
  const { handleOnSubmit, formConfig } = useProjectForm({
    edit,
  });

  return (
    <>
      <EntityForm<Project, ProjectFormValues>
        onSubmit={handleOnSubmit}
        formConfig={{ ...formConfig }}
        formLayout={{ columns: 1, rows: 3 }}
      />
    </>
  );
};

export default ProjectForm;
