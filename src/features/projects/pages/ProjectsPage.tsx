import { useState } from "react";
import EntityLayout from "../../../layouts/EntityLayout/EntityLayout";
import ProjectFormModal from "../components/ProjectFormModal";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import ProjectSection from "../components/ProjectSection";

const ProjectsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <>
      <EntityLayout title="Proyectos" onAddNew={() => setShowCreateForm(true)}>
        <Tabs defaultActiveKey="all">
          <Tab eventKey="all" title="Todos">
            <ProjectSection toast={true} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <ProjectFormModal
        show={showCreateForm}
        onHide={() => setShowCreateForm(false)}
      />
    </>
  );
};

export default ProjectsPage;
