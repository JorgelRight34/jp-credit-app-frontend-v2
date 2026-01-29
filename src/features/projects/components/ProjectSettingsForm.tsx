import { Project } from "../models/project";
import ProjectForm from "./ProjectForm";

interface ProjectSettingsFormProps {
  project: Project;
}

const ProjectSettingsForm = ({ project }: ProjectSettingsFormProps) => {
  return <ProjectForm edit={project} />;
};

export default ProjectSettingsForm;
