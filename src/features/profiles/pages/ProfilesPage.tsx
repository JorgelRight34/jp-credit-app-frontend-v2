import ProfilesSection from "../components/ProfilesSection";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { Tab, Tabs } from "@/components/Tabs";
import { profileModulePermissionsProvider } from "../lib/constants";

const ProfilesPage = () => {
  return (
    <EntityLayout
      title="Pérfiles"
      create={true}
      permissionsProvider={profileModulePermissionsProvider}
    >
      <Tabs defaultActiveKey="clients">
        <Tab title="Clientes" path="clients">
          <ProfilesSection role="client" />
        </Tab>
        <Tab path="guarantors" title="Garantes">
          <ProfilesSection role="guarantor" />
        </Tab>
        <Tab path="loanOfficers" title="Agentes">
          <ProfilesSection role="loanOfficer" />
        </Tab>
        <Tab path="all" title="Todos">
          <ProfilesSection />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default ProfilesPage;
