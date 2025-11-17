import { Tab, Tabs } from "@/components";
import { ProjectSection } from "@/features/projects";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
};

const Page = () => {
  return (
    <EntityLayout title="Proyectos" create={true}>
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Todos">
          <ProjectSection toast={true} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
