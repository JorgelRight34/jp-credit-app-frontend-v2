import EntityLayout from "../../../layouts/EntityLayout/EntityLayout";
import { useCurrentProject } from "../../../contexts/ProjectContext";
import ProjectSettingsForm from "../components/ProjectSettingsForm";
import ChooseProjectPrompt from "../components/ChooseProjectPrompt";
import ProjectSearchInput from "../components/ProjectSearchInput";

const ProjectSettingsPage = () => {
  const { project } = useCurrentProject();

  return (
    <EntityLayout title="Configuraciones">
      {project ? (
        <div className="border rounded-lg p-3 mt-3">
          <ProjectSearchInput
            className="mb-3"
            label="Proyecto"
            defaultEntity={project}
            defaultValue={project.id}
          />
          <ProjectSettingsForm project={project} />
        </div>
      ) : (
        <ChooseProjectPrompt />
      )}
    </EntityLayout>
  );
};

export default ProjectSettingsPage;
