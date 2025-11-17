import { Tab, Tabs } from "@/components";
import {
  profileModulePermissionsProvider,
  ProfilesSection,
} from "@/features/profiles";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pérfiles",
};

const Page = () => {
  return (
    <EntityLayout
      title="Pérfiles"
      create={true}
      permissionsProvider={profileModulePermissionsProvider}
    >
      <Tabs defaultActiveKey="clients">
        <Tab title="Clientes" eventKey="clients">
          <ProfilesSection role="client" />
        </Tab>
        <Tab eventKey="guarantors" title="Garantes">
          <ProfilesSection role="guarantor" />
        </Tab>
        <Tab eventKey="loanOfficers" title="Agentes">
          <ProfilesSection role="loanOfficer" />
        </Tab>
        <Tab eventKey="all" title="Todos">
          <ProfilesSection />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
