import { Tab, Tabs } from "@/components";
import { userModulePermissionsProvider, UsersSection } from "@/features/auth";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control de Acceso",
};

const Page = () => {
  return (
    <EntityLayout
      title="Control de Acceso"
      permissionsProvider={userModulePermissionsProvider}
      create={true}
    >
      <Tabs defaultActiveKey="admins">
        <Tab eventKey="admins" title="Administradores">
          <UsersSection role="admin" />
        </Tab>
        <Tab eventKey="users" title="Usuarios">
          <UsersSection role="user" />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
