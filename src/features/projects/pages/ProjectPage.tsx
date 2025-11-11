import { useParams } from "react-router";
import Tab from "../../../components/Tabs/Tab";
import Tabs from "../../../components/Tabs/Tabs";
import EntityLayout from "../../../layouts/EntityLayout/EntityLayout";
import useProject from "../hooks/useProject";
import NotFound from "../../../pages/Error/NotFound";
import LoadingIndicator from "../../../components/ui/LoadingIndicator";
import { useState } from "react";
import ProjectFormModal from "../components/ProjectFormModal";

const ProjectPage = () => {
  const { id } = useParams();
  const { project, isLoading, isError } = useProject({ id });
  const [showEditModal, setShowEditModal] = useState(false);

  if (isError) return <NotFound />;
  if (isLoading || !project) return <LoadingIndicator />;

  return (
    <>
      <EntityLayout title={project.name} onEdit={() => setShowEditModal(true)}>
        <Tabs defaultActiveKey="info">
          <Tab path="info" title="Info">
            ...
          </Tab>
        </Tabs>
      </EntityLayout>
      <ProjectFormModal
        edit={project}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      />
    </>
  );
};

export default ProjectPage;
