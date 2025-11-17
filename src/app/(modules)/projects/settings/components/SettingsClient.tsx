"use client";

import { useCurrentProject } from "@/contexts/ProjectContext";
import {
  ChooseProjectPrompt,
  ProjectSearchInput,
  ProjectSettingsForm,
} from "@/features/projects";
import { EntityLayout } from "@/layouts";

const SettingsClient = () => {
  const { project, chooseProject } = useCurrentProject();

  return (
    <EntityLayout title="Configuraciones">
      {project ? (
        <div className="mt-3 rounded-lg border p-3">
          <ProjectSearchInput
            className="mb-3"
            label="Proyecto"
            value={project.id}
            onChange={chooseProject}
          />
          <ProjectSettingsForm project={project} />
        </div>
      ) : (
        <ChooseProjectPrompt />
      )}
    </EntityLayout>
  );
};

export default SettingsClient;
