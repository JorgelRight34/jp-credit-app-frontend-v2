import {
  ProjectForm,
  projectsClient,
  projectsPermissionProvider,
} from "@/features/projects";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { FORM_PAGE_TITLES } from "@/utils/constants";

export async function generateMetadata({ params }: AppPageProps) {
  const project = await projectsClient.getProject(params.id);

  return { title: FORM_PAGE_TITLES.edit(project.name) };
}

const Page = async ({ params }: AppPageProps) => {
  const project = await projectsClient.getProject(params.id);

  return (
    <FormPageLayout
      title="Proyecto"
      permissionsProvider={projectsPermissionProvider}
      edit={true}
      onDelete={() => projectsClient.deleteProject(params.id)}
    >
      <ProjectForm edit={project} />
    </FormPageLayout>
  );
};

export default Page;
