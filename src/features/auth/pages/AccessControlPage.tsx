import UsersSection from "../components/UsersSection";
import { Tab, Tabs } from "@/components/Tabs";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import { userModulePermissionsProvider } from "../lib/constants";

const AccessControlPage = () => {
  return (
    <EntityLayout
      title="Control de Acceso"
      permissionsProvider={userModulePermissionsProvider}
      create={true}
    >
      <Tabs defaultActiveKey="admins">
        <Tab path="admins" title="Administradores">
          <UsersSection role="admin" />
        </Tab>
        <Tab path="users" title="Usuarios">
          <UsersSection role="user" />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default AccessControlPage;
